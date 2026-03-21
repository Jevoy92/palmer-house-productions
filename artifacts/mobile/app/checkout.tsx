import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Colors from "@/constants/colors";
import { useCart } from "@/contexts/CartContext";
import { getApiUrl } from "@/lib/api";

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  required,
  keyboardType,
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  required?: boolean;
  keyboardType?: TextInput["props"]["keyboardType"];
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.textTertiary}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        textAlignVertical={multiline ? "top" : "center"}
      />
    </View>
  );
}

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [preferredTimeline, setPreferredTimeline] = useState("");

  const canSubmit = fullName.trim() && email.trim() && items.length > 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setLoading(true);
    try {
      const packageDetails = items.map((item) => ({
        missionId: item.missionId,
        missionName: item.missionName,
        palId: item.palId,
        sessions: item.sessions,
        additionalVideos: item.additionalVideos,
        episodeLength: item.episodeLength,
        price: item.price,
      }));

      const uniquePals = [...new Set(items.map((i) => i.palId))];
      const primaryPal = uniquePals[0];
      const missionSummary = items.map((i) => i.missionId).join(", ");

      const response = await fetch(getApiUrl("/project-requests"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          companyName: companyName.trim() || undefined,
          email: email.trim(),
          phone: phone.trim() || undefined,
          palCategory: primaryPal,
          missionId: missionSummary,
          packageDetails: JSON.stringify(packageDetails),
          estimatedTotal: total,
          projectDescription: projectDescription.trim() || undefined,
          preferredTimeline: preferredTimeline.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `Request failed (${response.status})`);
      }

      clearCart();
      router.replace("/confirmation");
    } catch (error: any) {
      Alert.alert(
        "Something went wrong",
        error?.message?.includes("Request failed")
          ? "We couldn't process your request right now. Please try again."
          : "Please try again or contact us at info@palmerhouseproductions.com."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 160 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.summary}>
          {items.map((item) => (
            <View key={item.id} style={styles.summaryRow}>
              <Text style={styles.summaryName}>{item.missionName}</Text>
              <Text style={styles.summaryPrice}>${item.price.toLocaleString()}</Text>
            </View>
          ))}
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Estimated Total</Text>
            <Text style={styles.totalPrice}>${total.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Your details</Text>
          <Field label="Full Name" value={fullName} onChangeText={setFullName} placeholder="Your name" required />
          <Field label="Company" value={companyName} onChangeText={setCompanyName} placeholder="Optional" />
          <Field label="Email" value={email} onChangeText={setEmail} placeholder="your@email.com" required keyboardType="email-address" />
          <Field label="Phone" value={phone} onChangeText={setPhone} placeholder="Optional" keyboardType="phone-pad" />
          <Field label="About your project" value={projectDescription} onChangeText={setProjectDescription} placeholder="Goals, challenges, or anything else we should know" multiline />
          <Field label="Preferred timeline" value={preferredTimeline} onChangeText={setPreferredTimeline} placeholder="When would you like to start?" />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={[styles.submitButton, !canSubmit && styles.submitDisabled]}
          onPress={handleSubmit}
          disabled={!canSubmit || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Submit Request</Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  summary: {
    margin: 20,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 16,
    padding: 18,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  summaryName: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    flex: 1,
  },
  summaryPrice: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.text,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginVertical: 8,
  },
  totalLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
  },
  totalPrice: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.light.text,
    letterSpacing: -0.3,
  },
  form: { paddingHorizontal: 20 },
  formTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 17,
    color: Colors.light.text,
    marginBottom: 16,
  },
  field: { marginBottom: 16 },
  fieldLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 6,
  },
  required: { color: Colors.light.error },
  input: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.text,
  },
  inputMultiline: {
    minHeight: 100,
    paddingTop: 13,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.light.background,
    borderTopWidth: 1,
    borderTopColor: Colors.light.separator,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 36,
  },
  submitButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  submitDisabled: { opacity: 0.4 },
  submitText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#fff",
  },
});
