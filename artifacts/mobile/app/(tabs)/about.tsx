import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "@/constants/colors";

function TeamMember({
  name,
  role,
  icon,
}: {
  name: string;
  role: string;
  icon: string;
}) {
  return (
    <View style={styles.teamCard}>
      <View style={styles.teamAvatar}>
        <Feather name={icon as any} size={28} color={Colors.light.primary} />
      </View>
      <Text style={styles.teamName}>{name}</Text>
      <Text style={styles.teamRole}>{role}</Text>
    </View>
  );
}

function ContactItem({
  icon,
  label,
  value,
  onPress,
}: {
  icon: string;
  label: string;
  value: string;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.contactItem} onPress={onPress}>
      <View style={styles.contactIcon}>
        <Feather name={icon as any} size={20} color={Colors.light.primary} />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text
          style={[styles.contactValue, onPress && styles.contactLink]}
        >
          {value}
        </Text>
      </View>
      {onPress && (
        <Feather
          name="external-link"
          size={16}
          color={Colors.light.textSecondary}
        />
      )}
    </Pressable>
  );
}

export default function AboutScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>WHO WE ARE</Text>
        <Text style={styles.title}>Palmer House Productions</Text>
        <Text style={styles.body}>
          We're a video production company based in Bellevue, WA and Portland, OR.
          We don't just make videos — we build video systems that solve real business
          problems.
        </Text>
        <Text style={styles.body}>
          Every business has a story worth telling. Our job is to turn that story
          into a strategic system that builds trust, creates clarity, and drives
          conversions — not just "content."
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>OUR APPROACH</Text>
        <Text style={styles.subtitle}>Video as a system, not a one-off</Text>
        <View style={styles.valueCards}>
          <View style={styles.valueCard}>
            <Feather name="target" size={24} color={Colors.pal.reel} />
            <Text style={styles.valueTitle}>Problem-First</Text>
            <Text style={styles.valueDesc}>
              We start with your business problem, then design the video to solve it.
            </Text>
          </View>
          <View style={styles.valueCard}>
            <Feather name="layers" size={24} color={Colors.pal.system} />
            <Text style={styles.valueTitle}>Systematic</Text>
            <Text style={styles.valueDesc}>
              Each Pal category targets a specific lever in your business.
            </Text>
          </View>
          <View style={styles.valueCard}>
            <Feather name="trending-up" size={24} color={Colors.pal.evergreen} />
            <Text style={styles.valueTitle}>Compounding</Text>
            <Text style={styles.valueDesc}>
              Videos that work harder over time, not content that expires.
            </Text>
          </View>
          <View style={styles.valueCard}>
            <Feather name="users" size={24} color={Colors.pal.spotlight} />
            <Text style={styles.valueTitle}>Human</Text>
            <Text style={styles.valueDesc}>
              We make you feel confident on camera. No cringe, no pressure.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>PRICING</Text>
        <Text style={styles.subtitle}>Transparent, fair pricing</Text>
        <View style={styles.pricingCard}>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingItem}>Filming Session (2 hours)</Text>
            <Text style={styles.pricingPrice}>$450</Text>
          </View>
          <View style={styles.pricingDivider} />
          <View style={styles.pricingRow}>
            <Text style={styles.pricingItem}>Additional Video</Text>
            <Text style={styles.pricingPrice}>$150</Text>
          </View>
          <View style={styles.pricingDivider} />
          <View style={styles.pricingRow}>
            <Text style={styles.pricingItem}>Evergreen (5 min)</Text>
            <Text style={styles.pricingPrice}>$1,050</Text>
          </View>
          <View style={styles.pricingDivider} />
          <View style={styles.pricingRow}>
            <Text style={styles.pricingItem}>Evergreen (10 min)</Text>
            <Text style={styles.pricingPrice}>$1,650</Text>
          </View>
          <View style={styles.pricingDivider} />
          <View style={styles.pricingRow}>
            <Text style={styles.pricingItem}>Evergreen (15 min)</Text>
            <Text style={styles.pricingPrice}>$2,250</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>CONTACT</Text>
        <Text style={styles.subtitle}>Get in touch</Text>
        <View style={styles.contactList}>
          <ContactItem
            icon="mail"
            label="Email"
            value="info@palmerhouseproductions.com"
            onPress={() =>
              Linking.openURL("mailto:info@palmerhouseproductions.com")
            }
          />
          <ContactItem
            icon="phone"
            label="Phone"
            value="(253) 338-0673"
            onPress={() => Linking.openURL("tel:2533380673")}
          />
          <ContactItem
            icon="map-pin"
            label="Locations"
            value="Bellevue, WA & Portland, OR"
          />
          <ContactItem
            icon="globe"
            label="Website"
            value="palmerhouseproductions.com"
            onPress={() =>
              Linking.openURL("https://palmerhouseproductions.com")
            }
          />
        </View>
      </View>

      <View style={styles.section}>
        <LinearGradient
          colors={["#6B3FA0", "#4A2B70"]}
          style={styles.ctaCard}
        >
          <Feather name="calendar" size={32} color="#fff" />
          <Text style={styles.ctaTitle}>Ready for a discovery call?</Text>
          <Text style={styles.ctaSubtitle}>
            Let's talk about your goals and design a video system that works for
            your business.
          </Text>
          <Pressable
            style={styles.ctaButton}
            onPress={() =>
              Linking.openURL("https://palmerhouseproductions.com/contact")
            }
          >
            <Text style={styles.ctaButtonText}>Book a Discovery Call</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  section: { paddingHorizontal: 24, paddingTop: 28 },
  sectionLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: Colors.light.primary,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    color: Colors.light.text,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.light.text,
    marginBottom: 16,
  },
  body: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.textSecondary,
    lineHeight: 24,
    marginBottom: 12,
  },
  valueCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  valueCard: {
    width: "47%",
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 18,
  },
  valueTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    marginTop: 12,
    marginBottom: 4,
  },
  valueDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    lineHeight: 18,
  },
  pricingCard: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
  },
  pricingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  pricingItem: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.text,
  },
  pricingPrice: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: Colors.light.primary,
  },
  pricingDivider: {
    height: 1,
    backgroundColor: Colors.light.border,
  },
  teamRow: {
    flexDirection: "row",
    gap: 12,
  },
  teamCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
  },
  teamAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  teamName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 2,
  },
  teamRole: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
  contactList: { gap: 12 },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 14,
    padding: 16,
  },
  contactIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  contactInfo: { flex: 1 },
  contactLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginBottom: 2,
  },
  contactValue: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.light.text,
  },
  contactLink: { color: Colors.light.primary },
  ctaCard: {
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
  },
  ctaTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  ctaButtonText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#6B3FA0",
  },
});
