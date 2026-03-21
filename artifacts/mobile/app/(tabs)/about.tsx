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
  subtitle,
  onPress,
  trailing,
}: {
  icon: string;
  label: string;
  subtitle?: string;
  onPress?: () => void;
  trailing?: React.ReactNode;
}) {
  return (
    <Pressable style={styles.menuItem} onPress={onPress} disabled={!onPress}>
      <View style={styles.menuIcon}>
        <Feather name={icon as any} size={18} color={Colors.light.primary} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuLabel}>{label}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {trailing || (onPress && <Feather name="chevron-right" size={16} color={Colors.light.textTertiary} />)}
    </Pressable>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return <View style={styles.sectionCard}>{children}</View>;
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
        <View style={styles.brandLogo}>
          <Feather name="film" size={24} color={Colors.light.primary} />
        </View>
        <Text style={styles.brandName}>Palmer House Productions</Text>
        <Text style={styles.brandTagline}>Video systems that solve problems</Text>
        <View style={styles.locationBadge}>
          <Feather name="map-pin" size={12} color={Colors.light.textSecondary} />
          <Text style={styles.locationText}>Bellevue, WA & Portland, OR</Text>
        </View>
      </View>

      <View style={styles.sectionLabel}>
        <Text style={styles.sectionLabelText}>CONTACT</Text>
      </View>
      <SectionCard>
        <MenuItem
          icon="mail"
          label="Email"
          subtitle="info@palmerhouseproductions.com"
          onPress={() => Linking.openURL("mailto:info@palmerhouseproductions.com")}
        />
        <View style={styles.menuSeparator} />
        <MenuItem
          icon="phone"
          label="Phone"
          subtitle="(253) 338-0673"
          onPress={() => Linking.openURL("tel:2533380673")}
        />
        <View style={styles.menuSeparator} />
        <MenuItem
          icon="globe"
          label="Website"
          subtitle="palmerhouseproductions.com"
          onPress={() => Linking.openURL("https://palmerhouseproductions.com")}
        />
        <View style={styles.menuSeparator} />
        <MenuItem
          icon="calendar"
          label="Book a Discovery Call"
          onPress={() => Linking.openURL("https://palmerhouseproductions.com/contact")}
        />
      </SectionCard>

      <View style={styles.sectionLabel}>
        <Text style={styles.sectionLabelText}>PRICING</Text>
      </View>
      <SectionCard>
        <View style={styles.priceRow}>
          <Text style={styles.priceItem}>Filming Session (2 hrs)</Text>
          <Text style={styles.priceValue}>${PRICING.SESSION}</Text>
        </View>
        <View style={styles.menuSeparator} />
        <View style={styles.priceRow}>
          <Text style={styles.priceItem}>Additional Video</Text>
          <Text style={styles.priceValue}>${PRICING.ADDITIONAL_VIDEO}</Text>
        </View>
        <View style={styles.menuSeparator} />
        <View style={styles.priceRow}>
          <Text style={styles.priceItem}>Evergreen 5 min</Text>
          <Text style={styles.priceValue}>${PRICING.EVERGREEN[5].toLocaleString()}</Text>
        </View>
        <View style={styles.menuSeparator} />
        <View style={styles.priceRow}>
          <Text style={styles.priceItem}>Evergreen 10 min</Text>
          <Text style={styles.priceValue}>${PRICING.EVERGREEN[10].toLocaleString()}</Text>
        </View>
        <View style={styles.menuSeparator} />
        <View style={styles.priceRow}>
          <Text style={styles.priceItem}>Evergreen 15 min</Text>
          <Text style={styles.priceValue}>${PRICING.EVERGREEN[15].toLocaleString()}</Text>
        </View>
      </SectionCard>

      <View style={styles.sectionLabel}>
        <Text style={styles.sectionLabelText}>OUR APPROACH</Text>
      </View>
      <SectionCard>
        <View style={styles.approachItem}>
          <Feather name="target" size={18} color={Colors.pal.reel} />
          <View style={styles.approachContent}>
            <Text style={styles.approachTitle}>Problem-First</Text>
            <Text style={styles.approachDesc}>We start with your business problem, then design the video to solve it.</Text>
          </View>
        </View>
        <View style={styles.menuSeparator} />
        <View style={styles.approachItem}>
          <Feather name="layers" size={18} color={Colors.pal.system} />
          <View style={styles.approachContent}>
            <Text style={styles.approachTitle}>Systematic</Text>
            <Text style={styles.approachDesc}>Each Pal category targets a specific lever in your business.</Text>
          </View>
        </View>
        <View style={styles.menuSeparator} />
        <View style={styles.approachItem}>
          <Feather name="trending-up" size={18} color={Colors.pal.evergreen} />
          <View style={styles.approachContent}>
            <Text style={styles.approachTitle}>Compounding</Text>
            <Text style={styles.approachDesc}>Videos that work harder over time, not content that expires.</Text>
          </View>
        </View>
        <View style={styles.menuSeparator} />
        <View style={styles.approachItem}>
          <Feather name="heart" size={18} color={Colors.pal.spotlight} />
          <View style={styles.approachContent}>
            <Text style={styles.approachTitle}>Human</Text>
            <Text style={styles.approachDesc}>We make you feel confident on camera. No cringe, no pressure.</Text>
          </View>
        </View>
      </SectionCard>

      <View style={styles.sectionLabel}>
        <Text style={styles.sectionLabelText}>ABOUT</Text>
      </View>
      <SectionCard>
        <View style={styles.aboutBlock}>
          <Text style={styles.aboutText}>
            We don't just make videos — we build video systems that solve real business problems. Every business has a story worth telling. Our job is to turn that story into a strategic system that builds trust, creates clarity, and drives conversions.
          </Text>
        </View>
      </SectionCard>

      <View style={styles.sectionLabel}>
        <Text style={styles.sectionLabelText}>ACCOUNT</Text>
      </View>
      <SectionCard>
        {user ? (
          <>
            <MenuItem
              icon="user"
              label={user.fullName}
              subtitle={user.email}
              onPress={() => router.push("/profile")}
            />
            <View style={styles.menuSeparator} />
            <MenuItem
              icon="folder"
              label="Client Portal"
              subtitle="Track projects & review deliverables"
              onPress={() => router.push("/portal")}
            />
            <View style={styles.menuSeparator} />
            <MenuItem
              icon="log-out"
              label="Sign Out"
              onPress={handleLogout}
            />
          </>
        ) : (
          <>
            <MenuItem
              icon="log-in"
              label="Sign In"
              subtitle="Access your account & projects"
              onPress={() => router.push("/auth/login")}
            />
            <View style={styles.menuSeparator} />
            <MenuItem
              icon="user-plus"
              label="Create Account"
              subtitle="Get more AI credits & project tracking"
              onPress={() => router.push("/auth/register")}
            />
          </>
        )}
      </SectionCard>

      <Text style={styles.footerText}>
        Palmer House Productions{"\n"}Bellevue, WA & Portland, OR
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.backgroundSecondary },
  brandHeader: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 28,
    backgroundColor: Colors.light.background,
  },
  brandLogo: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  brandName: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.light.text,
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  brandTagline: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 10,
  },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.light.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  locationText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  sectionLabel: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionLabelText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: Colors.light.textSecondary,
    letterSpacing: 0.5,
  },
  sectionCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  menuContent: { flex: 1 },
  menuLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: Colors.light.text,
  },
  menuSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginTop: 1,
  },
  menuSeparator: {
    height: 1,
    backgroundColor: Colors.light.separator,
    marginLeft: 66,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  priceItem: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.text,
  },
  priceValue: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.primary,
  },
  approachItem: {
    flexDirection: "row",
    padding: 16,
    gap: 14,
    alignItems: "flex-start",
  },
  approachContent: { flex: 1 },
  approachTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 2,
  },
  approachDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    lineHeight: 18,
  },
  aboutBlock: { padding: 16 },
  aboutText: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.textSecondary,
    lineHeight: 22,
  },
  footerText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textTertiary,
    textAlign: "center",
    marginTop: 24,
    lineHeight: 18,
  },
});
