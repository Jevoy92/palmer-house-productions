import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "@/constants/colors";
import { PRICING } from "@/constants/data";
import { useAuth } from "@/contexts/AuthContext";

function MenuItem({
  icon,
  label,
  value,
  onPress,
}: {
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.menuItem} onPress={onPress} disabled={!onPress}>
      <Feather name={icon as any} size={16} color={Colors.light.textSecondary} />
      <Text style={styles.menuLabel}>{label}</Text>
      {value && <Text style={styles.menuValue}>{value}</Text>}
      {onPress && !value && <Feather name="chevron-right" size={14} color={Colors.light.textTertiary} />}
    </Pressable>
  );
}

export default function AboutScreen() {
  const router = useRouter();
  const { user, isGuest, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/welcome");
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.brandHeader}>
        <Text style={styles.brandName}>Palmer House Productions</Text>
        <Text style={styles.brandTagline}>Video systems that solve problems</Text>
        <View style={styles.locationRow}>
          <Feather name="map-pin" size={12} color={Colors.light.textTertiary} />
          <Text style={styles.locationText}>Bellevue, WA & Portland, OR</Text>
        </View>
      </View>

      <View style={styles.sectionLabel}>
        <Text style={styles.sectionLabelText}>CONTACT</Text>
      </View>
      <View style={styles.sectionGroup}>
        <MenuItem
          icon="mail"
          label="Email"
          value="info@palmerhouseproductions.com"
          onPress={() => Linking.openURL("mailto:info@palmerhouseproductions.com")}
        />
        <MenuItem
          icon="phone"
          label="Phone"
          value="(253) 338-0673"
          onPress={() => Linking.openURL("tel:2533380673")}
        />
        <MenuItem
          icon="globe"
          label="Website"
          onPress={() => Linking.openURL("https://palmerhouseproductions.com")}
        />
        <MenuItem
          icon="calendar"
          label="Book a Discovery Call"
          onPress={() => Linking.openURL("https://palmerhouseproductions.com/contact")}
        />
      </View>

      <View style={styles.sectionLabel}>
        <Text style={styles.sectionLabelText}>PRICING</Text>
      </View>
      <View style={styles.sectionGroup}>
        <View style={styles.priceRow}>
          <Text style={styles.priceItem}>Filming Session (2 hrs)</Text>
          <Text style={styles.priceValue}>${PRICING.SESSION}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceItem}>Additional Video</Text>
          <Text style={styles.priceValue}>${PRICING.ADDITIONAL_VIDEO}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceItem}>Evergreen 5 min</Text>
          <Text style={styles.priceValue}>${PRICING.EVERGREEN[5].toLocaleString()}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceItem}>Evergreen 10 min</Text>
          <Text style={styles.priceValue}>${PRICING.EVERGREEN[10].toLocaleString()}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceItem}>Evergreen 15 min</Text>
          <Text style={styles.priceValue}>${PRICING.EVERGREEN[15].toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.sectionLabel}>
        <Text style={styles.sectionLabelText}>OUR APPROACH</Text>
      </View>
      <View style={styles.sectionGroup}>
        <View style={styles.approachRow}>
          <Feather name="target" size={14} color={Colors.pal.reel} />
          <Text style={styles.approachText}><Text style={styles.approachBold}>Problem-First</Text> — Start with your business problem, then design the video.</Text>
        </View>
        <View style={styles.approachRow}>
          <Feather name="layers" size={14} color={Colors.pal.system} />
          <Text style={styles.approachText}><Text style={styles.approachBold}>Systematic</Text> — Each Pal targets a specific business lever.</Text>
        </View>
        <View style={styles.approachRow}>
          <Feather name="trending-up" size={14} color={Colors.pal.evergreen} />
          <Text style={styles.approachText}><Text style={styles.approachBold}>Compounding</Text> — Videos that work harder over time.</Text>
        </View>
        <View style={styles.approachRow}>
          <Feather name="heart" size={14} color={Colors.pal.spotlight} />
          <Text style={styles.approachText}><Text style={styles.approachBold}>Human</Text> — We make you feel confident on camera.</Text>
        </View>
      </View>

      <View style={styles.sectionLabel}>
        <Text style={styles.sectionLabelText}>ACCOUNT</Text>
      </View>
      <View style={styles.sectionGroup}>
        {user ? (
          <>
            <MenuItem icon="user" label={user.fullName} value={user.email} onPress={() => router.push("/profile")} />
            <MenuItem icon="folder" label="Client Portal" onPress={() => router.push("/portal")} />
            <MenuItem icon="log-out" label="Sign Out" onPress={handleLogout} />
          </>
        ) : (
          <>
            <MenuItem icon="log-in" label="Sign In" onPress={() => router.push("/auth/login")} />
            <MenuItem icon="user-plus" label="Create Account" onPress={() => router.push("/auth/register")} />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  brandHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
  },
  brandName: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.light.text,
    letterSpacing: -0.3,
    marginBottom: 3,
  },
  brandTagline: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textTertiary,
  },
  sectionLabel: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionLabelText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: Colors.light.textTertiary,
    letterSpacing: 0.8,
  },
  sectionGroup: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
  },
  menuLabel: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.text,
  },
  menuValue: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
  },
  priceItem: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.text,
  },
  priceValue: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.light.primary,
  },
  approachRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
  },
  approachText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  approachBold: {
    fontFamily: "Inter_600SemiBold",
    color: Colors.light.text,
  },
});
