import { Feather } from "@expo/vector-icons";
import React, { useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import { useAIGeneration } from "@/hooks/useAIGeneration";
import { ToolDefinition, ToolField } from "@/constants/tools";
import { PalId } from "@/constants/data";

interface AIToolScreenProps {
  tool: ToolDefinition;
}

const PAL_COLORS: Record<PalId, { main: string; light: string }> = {
  reel: { main: Colors.pal.reel, light: Colors.pal.reelLight },
  spotlight: { main: Colors.pal.spotlight, light: Colors.pal.spotlightLight },
  evergreen: { main: Colors.pal.evergreen, light: Colors.pal.evergreenLight },
  system: { main: Colors.pal.system, light: Colors.pal.systemLight },
};

export default function AIToolScreen({ tool }: AIToolScreenProps) {
  const insets = useSafeAreaInsets();
  const { user, isGuest } = useAuth();
  const { output, isGenerating, error, creditsUsed, generate, reset, cancel } = useAIGeneration();
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const outputScrollRef = useRef<ScrollView>(null);

  const palColor = PAL_COLORS[tool.palId];
  const credits = user?.credits ?? 3;
  const isFree = tool.creditCost === 0;
  const canGenerate = isFree || credits >= tool.creditCost;

  const hasRequiredFields = tool.fields
    .filter((f) => f.required)
    .every((f) => inputs[f.key]?.trim());

  useEffect(() => {
    if (output && outputScrollRef.current) {
      outputScrollRef.current.scrollToEnd({ animated: false });
    }
  }, [output]);

  const handleGenerate = async () => {
    Keyboard.dismiss();
    if (!hasRequiredFields) return;
    if (!canGenerate && !isFree) return;
    await generate(tool.id, tool.palId, inputs);
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: output });
    } catch {}
  };

  const handleReset = () => {
    reset();
    setInputs({});
  };

  if (output || isGenerating) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 56 }]}>
        <View style={styles.resultHeader}>
          <View style={[styles.toolIconSmall, { backgroundColor: palColor.light }]}>
            <Feather name={tool.icon as any} size={14} color={palColor.main} />
          </View>
          <View style={styles.resultHeaderText}>
            <Text style={styles.resultTitle}>{tool.name}</Text>
            {creditsUsed !== null && (
              <Text style={styles.creditsUsedText}>
                {creditsUsed} credit{creditsUsed > 1 ? "s" : ""} used
              </Text>
            )}
          </View>
          {!isGenerating && (
            <Pressable style={styles.newBtn} onPress={handleReset}>
              <Feather name="plus" size={14} color={palColor.main} />
              <Text style={[styles.newBtnText, { color: palColor.main }]}>New</Text>
            </Pressable>
          )}
        </View>

        <ScrollView
          ref={outputScrollRef}
          style={styles.outputScroll}
          contentContainerStyle={styles.outputContent}
          showsVerticalScrollIndicator={false}
        >
          {isGenerating && !output && (
            <View style={styles.generatingState}>
              <ActivityIndicator size="small" color={palColor.main} />
              <Text style={styles.generatingText}>Generating...</Text>
            </View>
          )}
          <Text style={styles.outputText} selectable>
            {output}
          </Text>
          {isGenerating && output && (
            <View style={styles.streamingIndicator}>
              <ActivityIndicator size="small" color={palColor.main} />
            </View>
          )}
        </ScrollView>

        {error && (
          <View style={styles.errorBar}>
            <Feather name="alert-circle" size={14} color={Colors.light.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!isGenerating && output && (
          <View style={[styles.actionBar, { paddingBottom: insets.bottom + 12 }]}>
            <Pressable style={styles.actionBtn} onPress={handleCopy}>
              <Feather name={copied ? "check" : "copy"} size={16} color={palColor.main} />
              <Text style={[styles.actionBtnText, { color: palColor.main }]}>
                {copied ? "Copied!" : "Copy"}
              </Text>
            </Pressable>
            <Pressable style={styles.actionBtn} onPress={handleShare}>
              <Feather name="share" size={16} color={palColor.main} />
              <Text style={[styles.actionBtnText, { color: palColor.main }]}>Share</Text>
            </Pressable>
            <Pressable
              style={[styles.regenerateBtn, { backgroundColor: palColor.main }]}
              onPress={handleGenerate}
            >
              <Feather name="refresh-cw" size={14} color="#fff" />
              <Text style={styles.regenerateBtnText}>Regenerate</Text>
            </Pressable>
          </View>
        )}

        {isGenerating && (
          <View style={[styles.actionBar, { paddingBottom: insets.bottom + 12 }]}>
            <Pressable style={styles.cancelBtn} onPress={cancel}>
              <Feather name="x" size={14} color={Colors.light.textSecondary} />
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  }

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top + 56,
        paddingBottom: insets.bottom + 100,
        paddingHorizontal: 20,
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[styles.toolIconLarge, { backgroundColor: palColor.light }]}>
        <Feather name={tool.icon as any} size={24} color={palColor.main} />
      </View>
      <Text style={styles.title}>{tool.name}</Text>
      <Text style={styles.subtitle}>{tool.description}</Text>

      {!isFree && (
        <View style={styles.costRow}>
          <Feather name="zap" size={12} color={palColor.main} />
          <Text style={[styles.costText, { color: palColor.main }]}>
            {tool.creditCost} credit{tool.creditCost > 1 ? "s" : ""}
          </Text>
          <Text style={styles.costSep}>·</Text>
          <Text style={styles.costAvailable}>{credits} available</Text>
        </View>
      )}
      {isFree && (
        <View style={styles.costRow}>
          <Text style={styles.freeLabel}>FREE</Text>
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.fieldsContainer}>
        {tool.fields.map((field) => (
          <FieldInput
            key={field.key}
            field={field}
            value={inputs[field.key] || ""}
            onChange={(val) => setInputs((prev) => ({ ...prev, [field.key]: val }))}
            accentColor={palColor.main}
          />
        ))}
      </View>

      {error && (
        <View style={styles.errorBox}>
          <Feather name="alert-circle" size={14} color={Colors.light.error} />
          <Text style={styles.errorBoxText}>{error}</Text>
        </View>
      )}

      <Pressable
        style={[
          styles.generateBtn,
          { backgroundColor: palColor.main },
          (!hasRequiredFields || (!canGenerate && !isFree)) && styles.generateBtnDisabled,
        ]}
        onPress={handleGenerate}
        disabled={!hasRequiredFields || (!canGenerate && !isFree)}
      >
        <Feather name="zap" size={16} color="#fff" />
        <Text style={styles.generateBtnText}>Generate</Text>
      </Pressable>

      {!canGenerate && !isFree && (
        <Text style={styles.insufficientText}>
          Not enough credits. {isGuest ? "Create an account for more credits." : "Purchase more credits to continue."}
        </Text>
      )}
    </ScrollView>
  );
}

function FieldInput({
  field,
  value,
  onChange,
  accentColor,
}: {
  field: ToolField;
  value: string;
  onChange: (val: string) => void;
  accentColor: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldLabelRow}>
        <Text style={styles.fieldLabel}>{field.label}</Text>
        {field.required && <Text style={[styles.requiredStar, { color: accentColor }]}>*</Text>}
      </View>
      <TextInput
        style={[
          styles.fieldInput,
          field.multiline && styles.fieldInputMultiline,
          focused && { borderColor: accentColor },
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={field.placeholder}
        placeholderTextColor={Colors.light.textTertiary}
        multiline={field.multiline}
        numberOfLines={field.multiline ? 4 : 1}
        textAlignVertical={field.multiline ? "top" : "center"}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  toolIconLarge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: Colors.light.text,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 21,
    marginBottom: 14,
  },
  costRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 4,
  },
  costText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
  },
  costSep: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textTertiary,
  },
  costAvailable: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  freeLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#15803D",
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    overflow: "hidden",
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.separator,
    marginVertical: 16,
  },
  fieldsContainer: {
    gap: 14,
    marginBottom: 20,
  },
  fieldContainer: {},
  fieldLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginBottom: 6,
  },
  fieldLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: Colors.light.text,
  },
  requiredStar: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.text,
    backgroundColor: Colors.light.background,
  },
  fieldInputMultiline: {
    minHeight: 100,
    paddingTop: 12,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  errorBoxText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: Colors.light.error,
    flex: 1,
  },
  generateBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    borderRadius: 8,
  },
  generateBtnDisabled: {
    opacity: 0.4,
  },
  generateBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#fff",
  },
  insufficientText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.error,
    textAlign: "center",
    marginTop: 10,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
  },
  toolIconSmall: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  resultHeaderText: {
    flex: 1,
  },
  resultTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
  },
  creditsUsedText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.light.textSecondary,
  },
  newBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  newBtnText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
  },
  outputScroll: {
    flex: 1,
  },
  outputContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  outputText: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.text,
    lineHeight: 24,
  },
  generatingState: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 16,
  },
  generatingText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  streamingIndicator: {
    marginTop: 12,
  },
  errorBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 8,
    padding: 10,
  },
  errorText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: Colors.light.error,
    flex: 1,
  },
  actionBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.light.separator,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  actionBtnText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
  },
  regenerateBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 10,
    borderRadius: 8,
  },
  regenerateBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#fff",
  },
  cancelBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  cancelBtnText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
});
