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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { register } = useAuth();

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const canSubmit = fullName.trim() && email.trim() && password.length >= 6;

  const handleRegister = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      await register({
        email: email.trim(),
        password,
        fullName: fullName.trim(),
        companyName: companyName.trim() || undefined,
      });
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message || "Please try again.");
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
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={18} color={Colors.light.text} />
        </Pressable>

        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>
          Get started with video content tools
        </Text>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Your name"
              placeholderTextColor={Colors.light.textTertiary}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Company <Text style={styles.optional}>(optional)</Text></Text>
            <TextInput
              style={styles.input}
              value={companyName}
              onChangeText={setCompanyName}
              placeholder="Your company"
              placeholderTextColor={Colors.light.textTertiary}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              placeholderTextColor={Colors.light.textTertiary}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrap}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                value={password}
                onChangeText={setPassword}
                placeholder="Min 6 characters"
                placeholderTextColor={Colors.light.textTertiary}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <Pressable
                style={styles.eyeBtn}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Feather name={showPassword ? "eye-off" : "eye"} size={16} color={Colors.light.textSecondary} />
              </Pressable>
            </View>
          </View>

          <Pressable
            style={[styles.submitBtn, !canSubmit && styles.submitDisabled]}
            onPress={handleRegister}
            disabled={!canSubmit || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>Create Account</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable onPress={() => router.replace("/auth/login")}>
            <Text style={styles.footerLink}>Sign in</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  content: { paddingHorizontal: 24, paddingBottom: 40 },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.light.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: Colors.light.text,
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 32,
  },
  form: { gap: 16 },
  field: {},
  label: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: Colors.light.text,
    marginBottom: 6,
  },
  optional: {
    fontFamily: "Inter_400Regular",
    color: Colors.light.textTertiary,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.text,
  },
  passwordWrap: { position: "relative" },
  passwordInput: { paddingRight: 44 },
  eyeBtn: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  submitBtn: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 6,
  },
  submitDisabled: { opacity: 0.4 },
  submitText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 28,
  },
  footerText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  footerLink: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: Colors.light.primary,
  },
});
