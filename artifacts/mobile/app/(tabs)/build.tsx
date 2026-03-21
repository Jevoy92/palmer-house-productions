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

const PAL_META: Record<PalId, { color: string; bg: string; icon: string }> = {
  reel: { color: Colors.pal.reel, bg: Colors.pal.reelLight, icon: "smartphone" },
  spotlight: { color: Colors.pal.spotlight, bg: Colors.pal.spotlightLight, icon: "film" },
  system: { color: Colors.pal.system, bg: Colors.pal.systemLight, icon: "settings" },
  evergreen: { color: Colors.pal.evergreen, bg: Colors.pal.evergreenLight, icon: "play-circle" },
};

function CartItemCard({
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
      <View style={styles.cartItemRow}>
        <View style={[styles.cartItemDot, { backgroundColor: meta.color }]} />
        <View style={styles.cartItemInfo}>
          <Text style={styles.cartItemPal}>{pal.name}</Text>
          <Text style={styles.cartItemMission}>{item.missionName}</Text>
          <View style={styles.cartItemMeta}>
            {item.episodeLength ? (
              <Text style={styles.cartItemDetail}>{item.episodeLength} min</Text>
            ) : (
              <>
                <Text style={styles.cartItemDetail}>
                  {item.sessions} session{item.sessions > 1 ? "s" : ""}
                </Text>
                <View style={styles.metaDot} />
                <Text style={styles.cartItemDetail}>
                  {item.additionalVideos} video{item.additionalVideos > 1 ? "s" : ""}
                </Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.cartItemRight}>
          <Text style={styles.cartItemPrice}>
            ${item.price.toLocaleString()}
          </Text>
          <Pressable style={styles.removeButton} onPress={onRemove} hitSlop={12}>
            <Feather name="x" size={14} color={Colors.light.textSecondary} />
          </Pressable>
        </View>
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
        <View style={styles.emptyIconWrap}>
          <Feather name="layers" size={40} color={Colors.light.primaryMuted} />
        </View>
        <Text style={styles.emptyTitle}>No items yet</Text>
        <Text style={styles.emptySubtitle}>
          Browse our services and add missions to build your custom video package.
        </Text>
        <Pressable
          style={styles.emptyButton}
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
            <CartItemCard
              key={item.id}
              item={item}
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </View>

        <View style={styles.addMore}>
          <Pressable
            style={styles.addMoreButton}
            onPress={() => router.push("/(tabs)/pals")}
          >
            <Feather name="plus" size={16} color={Colors.light.primary} />
            <Text style={styles.addMoreText}>Add more services</Text>
          </Pressable>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Estimated Total</Text>
          <Text style={styles.totalAmount}>${total.toLocaleString()}</Text>
        </View>
        <Pressable
          style={styles.checkoutButton}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.checkoutButtonText}>Continue</Text>
        </Pressable>
        <Text style={styles.disclaimer}>
          Final pricing confirmed after discovery call
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
    paddingHorizontal: 48,
    backgroundColor: Colors.light.background,
  },
  emptyIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: Colors.light.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 20,
    color: Colors.light.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 100,
  },
  emptyButtonText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#fff",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  itemCount: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  clearText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.error,
  },
  cartList: {
    paddingHorizontal: 20,
    gap: 1,
  },
  cartItem: {
    backgroundColor: Colors.light.background,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.separator,
  },
  cartItemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  cartItemDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  cartItemInfo: { flex: 1 },
  cartItemPal: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginBottom: 2,
  },
  cartItemMission: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 4,
  },
  cartItemMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cartItemDetail: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.light.textTertiary,
  },
  cartItemRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  cartItemPrice: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.light.text,
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.light.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  addMore: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  addMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    borderStyle: "dashed",
  },
  addMoreText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: Colors.light.primary,
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: Colors.light.textSecondary,
  },
  totalAmount: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: Colors.light.text,
    letterSpacing: -0.5,
  },
  checkoutButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
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
    color: Colors.light.textTertiary,
    textAlign: "center",
  },
});
