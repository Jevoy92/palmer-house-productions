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
import { PALS, PalId } from "@/constants/data";

const PAL_COLORS: Record<PalId, string> = {
  reel: Colors.pal.reel,
  spotlight: Colors.pal.spotlight,
  system: Colors.pal.system,
  evergreen: Colors.pal.evergreen,
};

function CartItemCard({
  item,
  onRemove,
}: {
  item: any;
  onRemove: () => void;
}) {
  const pal = PALS[item.palId as PalId];
  const color = PAL_COLORS[item.palId as PalId];

  return (
    <View style={styles.cartItem}>
      <View style={styles.cartItemHeader}>
        <View style={[styles.cartItemBadge, { backgroundColor: color + "18" }]}>
          <Feather name={pal.icon as any} size={16} color={color} />
        </View>
        <View style={styles.cartItemInfo}>
          <Text style={styles.cartItemPal}>{pal.name}</Text>
          <Text style={styles.cartItemMission}>{item.missionName}</Text>
        </View>
        <Pressable onPress={onRemove} hitSlop={12}>
          <Feather name="x" size={18} color={Colors.light.textSecondary} />
        </Pressable>
      </View>

      <View style={styles.cartItemDetails}>
        {item.episodeLength ? (
          <Text style={styles.cartItemDetail}>
            {item.episodeLength} min episode
          </Text>
        ) : (
          <>
            <Text style={styles.cartItemDetail}>
              {item.sessions} session{item.sessions > 1 ? "s" : ""}
            </Text>
            <Text style={styles.cartItemDetail}>
              {item.additionalVideos} additional video{item.additionalVideos > 1 ? "s" : ""}
            </Text>
          </>
        )}
      </View>

      <View style={styles.cartItemPrice}>
        <Text style={styles.cartItemPriceText}>
          ${item.price.toLocaleString()}
        </Text>
      </View>
    </View>
  );
}

export default function BuildScreen() {
  const router = useRouter();
  const { items, removeItem, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <Feather name="shopping-bag" size={48} color={Colors.light.primaryLight} />
        </View>
        <Text style={styles.emptyTitle}>Your package is empty</Text>
        <Text style={styles.emptySubtitle}>
          Browse our Pals and add missions to build your custom video package.
        </Text>
        <Pressable
          style={styles.emptyButton}
          onPress={() => router.push("/(tabs)/pals")}
        >
          <Text style={styles.emptyButtonText}>Explore Services</Text>
          <Feather name="arrow-right" size={18} color="#fff" />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 180 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.itemCount}>
            {items.length} item{items.length > 1 ? "s" : ""} in your package
          </Text>
          <Pressable onPress={clearCart}>
            <Text style={styles.clearText}>Clear all</Text>
          </Pressable>
        </View>

        {items.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Estimated Total</Text>
          <Text style={styles.totalAmount}>${total.toLocaleString()}</Text>
        </View>
        <Pressable
          style={styles.checkoutButton}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.checkoutButtonText}>Submit Project Request</Text>
          <Feather name="send" size={18} color="#fff" />
        </Pressable>
        <Text style={styles.disclaimer}>
          This is an estimate. Final pricing confirmed after discovery call.
        </Text>
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
    paddingHorizontal: 40,
    backgroundColor: Colors.light.background,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: Colors.light.primaryLight + "40",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: Colors.light.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  itemCount: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
  },
  clearText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.error,
  },
  cartItem: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.light.cardBorder,
  },
  cartItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  cartItemBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cartItemInfo: { flex: 1 },
  cartItemPal: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  cartItemMission: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
  },
  cartItemDetails: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  cartItemDetail: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  cartItemPrice: { alignItems: "flex-end" },
  cartItemPriceText: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.light.primary,
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
    paddingTop: 16,
    paddingBottom: 32,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  totalAmount: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: Colors.light.primary,
  },
  checkoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 8,
  },
  checkoutButtonText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  disclaimer: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
});
