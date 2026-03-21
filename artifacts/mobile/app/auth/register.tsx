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
          <Feather name="arrow-left" size={20} color={Colors.light.text} />
        </Pressable>

        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>
          Get started with video content tools and service exploration
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
                <Feather name={showPassword ? "eye-off" : "eye"} size={18} color={Colors.light.textSecondary} />
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
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.light.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: Colors.light.text,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: Colors.light.textSecondary,
    lineHeight: 22,
    marginBottom: 36,
  },
  form: { gap: 18 },
  field: {},
  label: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 8,
  },
  optional: {
    fontFamily: "Inter_400Regular",
    color: Colors.light.textTertiary,
  },
  input: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: Colors.light.text,
  },
  passwordWrap: { position: "relative" },
  passwordInput: { paddingRight: 48 },
  eyeBtn: {
    position: "absolute",
    right: 14,
    top: 14,
  },
  submitBtn: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
  },
  submitDisabled: { opacity: 0.4 },
  submitText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 32,
  },
  footerText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  footerLink: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.light.primary,
  },
});
