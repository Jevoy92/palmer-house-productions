import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "@/constants/colors";
import { useCart } from "@/contexts/CartContext";
import { useActivePal } from "@/contexts/ActivePalContext";
import { PALS, PalId } from "@/constants/data";

const PAL_META: Record<PalId, { color: string }> = {
  reel: { color: Colors.pal.reel },
  spotlight: { color: Colors.pal.spotlight },
  system: { color: Colors.pal.system },
  evergreen: { color: Colors.pal.evergreen },
};

function CartItemRow({
  item,
  onRemove,
}: {
  item: any;
  onRemove: () => void;
}) {
  const pal = PALS[item.palId as PalId];
  const meta = PAL_META[item.palId as PalId];

  return (
    <View style={styles.cartItem}>
      <View style={[styles.cartDot, { backgroundColor: meta.color }]} />
      <View style={styles.cartInfo}>
        <Text style={styles.cartMission}>{item.missionName}</Text>
        <Text style={styles.cartDetail}>
          {pal.name}
          {item.episodeLength
            ? ` · ${item.episodeLength} min`
            : ` · ${item.sessions}s · ${item.additionalVideos}v`}
        </Text>
      </View>
      <Text style={styles.cartPrice}>${item.price.toLocaleString()}</Text>
      <Pressable onPress={onRemove} hitSlop={12} style={styles.removeBtn}>
        <Feather name="x" size={14} color={Colors.light.textTertiary} />
      </Pressable>
    </View>
  );
}

export default function BuildScreen() {
  const router = useRouter();
  const { items, removeItem, total, clearCart } = useCart();
  const { accentColor } = useActivePal();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Feather name="layers" size={32} color={Colors.light.textTertiary} />
        <Text style={styles.emptyTitle}>No items yet</Text>
        <Text style={styles.emptySubtitle}>
          Browse services to build your package.
        </Text>
        <Pressable
          style={[styles.emptyButton, { backgroundColor: accentColor }]}
          onPress={() => router.push("/(tabs)/pals")}
        >
          <Text style={styles.emptyButtonText}>Explore Services</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listHeader}>
          <Text style={styles.itemCount}>
            {items.length} item{items.length > 1 ? "s" : ""}
          </Text>
          <Pressable onPress={clearCart} hitSlop={8}>
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>
        </View>

        <View style={styles.cartList}>
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </View>

        <Pressable
          style={styles.addMoreBtn}
          onPress={() => router.push("/(tabs)/pals")}
        >
          <Feather name="plus" size={14} color={accentColor} />
          <Text style={[styles.addMoreText, { color: accentColor }]}>Add more</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Estimated Total</Text>
          <Text style={styles.totalAmount}>${total.toLocaleString()}</Text>
        </View>
        <Pressable
          style={[styles.checkoutBtn, { backgroundColor: accentColor }]}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.checkoutText}>Continue</Text>
        </Pressable>
        <Text style={styles.disclaimer}>Final pricing confirmed after discovery call</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  scrollView: { flex: 1 },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 48,
    backgroundColor: Colors.light.background,
    gap: 8,
  },
  emptyTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 18,
    color: Colors.light.text,
    marginTop: 8,
  },
  emptySubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginBottom: 16,
  },
  emptyButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#fff",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  itemCount: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: Colors.light.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  clearText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: Colors.light.error,
  },
  cartList: {
    paddingHorizontal: 20,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
  },
  cartDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  cartInfo: { flex: 1 },
  cartMission: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: Colors.light.text,
  },
  cartDetail: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 1,
  },
  cartPrice: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
  },
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  addMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    borderStyle: "dashed",
  },
  addMoreText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
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
    paddingTop: 14,
    paddingBottom: 40,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  totalLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  totalAmount: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: Colors.light.text,
    letterSpacing: -0.5,
  },
  checkoutBtn: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 6,
  },
  checkoutText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#fff",
  },
  disclaimer: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.light.textTertiary,
    textAlign: "center",
  },
});
