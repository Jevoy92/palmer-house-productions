import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const SPEED_LABELS = ["Slow", "Medium", "Fast", "Turbo"];
const SPEED_VALUES = [30, 55, 85, 120];

export default function TeleprompterLiveScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ script?: string }>();

  const [script, setScript] = useState(params.script || "");
  const [mode, setMode] = useState<"edit" | "live">(params.script ? "live" : "edit");
  const [isScrolling, setIsScrolling] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1);
  const [fontSize, setFontSize] = useState(32);
  const [mirrored, setMirrored] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const currentScrollRef = useRef(0);
  const contentHeightRef = useRef(0);
  const scrollViewHeightRef = useRef(0);

  const startScrolling = useCallback(() => {
    if (!script.trim()) return;

    const maxScroll = contentHeightRef.current - scrollViewHeightRef.current;
    if (maxScroll <= 0) return;

    const remaining = maxScroll - currentScrollRef.current;
    if (remaining <= 0) return;

    const pixelsPerSecond = SPEED_VALUES[speedIndex];
    const duration = (remaining / pixelsPerSecond) * 1000;

    scrollY.setValue(currentScrollRef.current);

    const animation = Animated.timing(scrollY, {
      toValue: maxScroll,
      duration,
      useNativeDriver: false,
    });

    animationRef.current = animation;
    setIsScrolling(true);

    animation.start(({ finished }) => {
      if (finished) {
        setIsScrolling(false);
        currentScrollRef.current = maxScroll;
      }
    });
  }, [script, speedIndex, scrollY]);

  const pauseScrolling = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
    setIsScrolling(false);
  }, []);

  const resetScrolling = useCallback(() => {
    pauseScrolling();
    currentScrollRef.current = 0;
    scrollY.setValue(0);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, [pauseScrolling, scrollY]);

  useEffect(() => {
    const id = scrollY.addListener(({ value }) => {
      currentScrollRef.current = value;
      scrollViewRef.current?.scrollTo({ y: value, animated: false });
    });
    return () => scrollY.removeListener(id);
  }, [scrollY]);

  useEffect(() => {
    if (isScrolling) {
      pauseScrolling();
      startScrolling();
    }
  }, [speedIndex]);

  if (mode === "edit") {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={22} color={Colors.light.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Teleprompter</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Paste your script below</Text>
          <TextInput
            style={styles.scriptInput}
            multiline
            placeholder={"Type or paste your script here...\n\nTip: Use the Teleprompter Script AI tool to optimize your script for smooth reading first!"}
            placeholderTextColor={Colors.light.textTertiary}
            value={script}
            onChangeText={setScript}
            textAlignVertical="top"
          />
          <Pressable
            style={[styles.startBtn, !script.trim() && styles.startBtnDisabled]}
            onPress={() => {
              resetScrolling();
              setMode("live");
            }}
            disabled={!script.trim()}
          >
            <Feather name="play" size={18} color="#fff" />
            <Text style={styles.startBtnText}>Start Teleprompter</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.prompterContainer, { paddingTop: insets.top }]}>
      <View style={styles.prompterHeader}>
        <Pressable onPress={() => { pauseScrolling(); setMode("edit"); }} style={styles.prompterBackBtn}>
          <Feather name="edit-3" size={18} color="#fff" />
        </Pressable>
        <Text style={styles.prompterTitle}>Teleprompter</Text>
        <Pressable onPress={() => { pauseScrolling(); router.back(); }} style={styles.prompterBackBtn}>
          <Feather name="x" size={20} color="#fff" />
        </Pressable>
      </View>

      <View style={styles.prompterContent}>
        <View style={styles.guideLine} />
        <ScrollView
          ref={scrollViewRef}
          style={styles.prompterScroll}
          scrollEnabled={!isScrolling}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={(_, h) => { contentHeightRef.current = h; }}
          onLayout={(e) => { scrollViewHeightRef.current = e.nativeEvent.layout.height; }}
          onScrollEndDrag={(e) => {
            currentScrollRef.current = e.nativeEvent.contentOffset.y;
          }}
        >
          <View style={{ height: SCREEN_HEIGHT * 0.35 }} />
          <Text
            style={[
              styles.prompterText,
              { fontSize, lineHeight: fontSize * 1.6 },
              mirrored && { transform: [{ scaleX: -1 }] },
            ]}
          >
            {script}
          </Text>
          <View style={{ height: SCREEN_HEIGHT * 0.5 }} />
        </ScrollView>
      </View>

      <View style={[styles.controlBar, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.controlRow}>
          <Pressable onPress={() => setFontSize((s) => Math.max(20, s - 4))} style={styles.controlBtn}>
            <Text style={styles.controlBtnText}>A-</Text>
          </Pressable>
          <Pressable onPress={() => setFontSize((s) => Math.min(52, s + 4))} style={styles.controlBtn}>
            <Text style={[styles.controlBtnText, { fontSize: 18 }]}>A+</Text>
          </Pressable>
          <Pressable onPress={() => setMirrored(!mirrored)} style={[styles.controlBtn, mirrored && styles.controlBtnActive]}>
            <Feather name="refresh-cw" size={16} color={mirrored ? Colors.pal.reel : "#fff"} />
          </Pressable>
          <Pressable
            onPress={() => setSpeedIndex((i) => (i + 1) % SPEED_VALUES.length)}
            style={styles.speedBtn}
          >
            <Feather name="fast-forward" size={14} color="#fff" />
            <Text style={styles.speedBtnText}>{SPEED_LABELS[speedIndex]}</Text>
          </Pressable>
        </View>

        <View style={styles.mainControls}>
          <Pressable onPress={resetScrolling} style={styles.resetBtn}>
            <Feather name="skip-back" size={20} color="#fff" />
          </Pressable>
          <Pressable
            onPress={isScrolling ? pauseScrolling : startScrolling}
            style={[styles.playBtn, { backgroundColor: Colors.pal.reel }]}
          >
            <Feather name={isScrolling ? "pause" : "play"} size={28} color="#fff" />
          </Pressable>
          <View style={{ width: 48 }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 17,
    color: Colors.light.text,
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  inputLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 12,
  },
  scriptInput: {
    flex: 1,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: Colors.light.text,
    lineHeight: 26,
    marginBottom: 16,
  },
  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.pal.reel,
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  startBtnDisabled: {
    opacity: 0.4,
  },
  startBtnText: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#fff",
  },
  prompterContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  prompterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 10,
  },
  prompterBackBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  prompterTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "rgba(255,255,255,0.6)",
  },
  prompterContent: {
    flex: 1,
    position: "relative",
  },
  guideLine: {
    position: "absolute",
    top: "35%",
    left: 16,
    right: 16,
    height: 2,
    backgroundColor: Colors.pal.reel,
    opacity: 0.6,
    zIndex: 10,
  },
  prompterScroll: {
    flex: 1,
    paddingHorizontal: 24,
  },
  prompterText: {
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
    textAlign: "center",
  },
  controlBar: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: "rgba(0,0,0,0.9)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  controlRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 16,
  },
  controlBtn: {
    width: 44,
    height: 36,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  controlBtnActive: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 1,
    borderColor: Colors.pal.reel,
  },
  controlBtnText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#fff",
  },
  speedBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  speedBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#fff",
  },
  mainControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  resetBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  playBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
