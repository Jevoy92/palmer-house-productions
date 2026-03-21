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

function FormField({
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
        placeholderTextColor="#9CA3AF"
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
        "Submission Error",
        error?.message?.includes("Request failed")
          ? "We couldn't process your request right now. Please try again."
          : "Something went wrong. Please try again or contact us directly at info@palmerhouseproductions.com."
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
          <Text style={styles.summaryTitle}>Package Summary</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.summaryItem}>
              <Text style={styles.summaryItemName}>{item.missionName}</Text>
              <Text style={styles.summaryItemPrice}>
                ${item.price.toLocaleString()}
              </Text>
            </View>
          ))}
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryTotal}>Estimated Total</Text>
            <Text style={styles.summaryTotalPrice}>
              ${total.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Your Information</Text>

          <FormField
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Your name"
            required
          />
          <FormField
            label="Company Name"
            value={companyName}
            onChangeText={setCompanyName}
            placeholder="Your company (optional)"
          />
          <FormField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            required
            keyboardType="email-address"
          />
          <FormField
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            placeholder="(optional)"
            keyboardType="phone-pad"
          />
          <FormField
            label="Tell Us About Your Project"
            value={projectDescription}
            onChangeText={setProjectDescription}
            placeholder="What are your goals? What problems are you trying to solve?"
            multiline
          />
          <FormField
            label="Preferred Timeline"
            value={preferredTimeline}
            onChangeText={setPreferredTimeline}
            placeholder="When would you like to get started?"
          />
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
            <>
              <Text style={styles.submitText}>Submit Project Request</Text>
              <Feather name="send" size={18} color="#fff" />
            </>
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
    padding: 20,
  },
  summaryTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  summaryItemName: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    flex: 1,
  },
  summaryItemPrice: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.light.text,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginVertical: 10,
  },
  summaryTotal: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.light.text,
  },
  summaryTotalPrice: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.light.primary,
  },
  form: { paddingHorizontal: 20 },
  formTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: 20,
  },
  field: { marginBottom: 18 },
  fieldLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 8,
  },
  required: { color: Colors.light.error },
  input: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.text,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  inputMultiline: {
    minHeight: 100,
    paddingTop: 14,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.light.background,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 14,
  },
  submitDisabled: { opacity: 0.5 },
  submitText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#fff",
  },
});
