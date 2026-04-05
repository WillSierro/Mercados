import { Platform, StyleSheet } from "react-native";

import { palette } from "./theme";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background
  },
  container: {
    flex: 1
  },
  appShell: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12
  },
  screenContent: {
    gap: 16,
    paddingBottom: 28
  },
  headerCard: {
    backgroundColor: palette.surface,
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: palette.line,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8
    },
    elevation: 3,
    gap: 14
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14
  },
  brandBag: {
    width: 58,
    height: 64,
    borderRadius: 18,
    backgroundColor: palette.yellow,
    justifyContent: "center",
    alignItems: "center"
  },
  brandBagMarkLeft: {
    position: "absolute",
    top: 20,
    left: 14,
    width: 16,
    height: 22,
    borderRadius: 12,
    backgroundColor: palette.red,
    transform: [{ rotate: "-32deg" }]
  },
  brandBagMarkRight: {
    position: "absolute",
    top: 18,
    right: 14,
    width: 16,
    height: 24,
    borderRadius: 12,
    backgroundColor: palette.blue,
    transform: [{ rotate: "30deg" }]
  },
  headerTextColumn: {
    flex: 1,
    gap: 6
  },
  eyebrow: {
    color: palette.blue,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.1
  },
  headerTitle: {
    color: palette.text,
    fontSize: 28,
    fontWeight: "800"
  },
  headerCopy: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 20
  },
  heroCard: {
    backgroundColor: palette.blueDeep,
    borderRadius: 30,
    padding: 20,
    gap: 12
  },
  heroPill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.14)",
    color: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "700"
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    lineHeight: 31,
    fontWeight: "800"
  },
  heroCopy: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 14,
    lineHeight: 20
  },
  metricRow: {
    flexDirection: "row",
    gap: 10
  },
  metricChip: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 20,
    padding: 12
  },
  metricValue: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800"
  },
  metricLabel: {
    color: "rgba(255,255,255,0.76)",
    fontSize: 12,
    marginTop: 2
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap"
  },
  primaryButton: {
    backgroundColor: palette.yellow,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 13
  },
  primaryButtonText: {
    color: palette.blueDeep,
    fontSize: 14,
    fontWeight: "800"
  },
  secondaryButton: {
    backgroundColor: palette.blueSoft,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 13
  },
  secondaryButtonText: {
    color: palette.blueDeep,
    fontSize: 14,
    fontWeight: "700"
  },
  ghostButton: {
    backgroundColor: palette.surfaceMuted,
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 13
  },
  ghostButtonText: {
    color: palette.text,
    fontSize: 14,
    fontWeight: "700"
  },
  dangerButton: {
    backgroundColor: palette.redSoft,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 13
  },
  dangerButtonText: {
    color: palette.red,
    fontSize: 14,
    fontWeight: "700"
  },
  segmentCard: {
    flexDirection: "row",
    backgroundColor: palette.surface,
    borderRadius: 999,
    padding: 6,
    borderWidth: 1,
    borderColor: palette.line,
    gap: 8
  },
  segmentButton: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center"
  },
  segmentButtonActive: {
    backgroundColor: palette.yellow
  },
  segmentButtonText: {
    color: palette.text,
    fontSize: 14,
    fontWeight: "700"
  },
  segmentButtonTextActive: {
    color: palette.blueDeep
  },
  searchCard: {
    backgroundColor: palette.surface,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.line,
    gap: 10
  },
  fieldLabel: {
    color: palette.text,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8
  },
  input: {
    backgroundColor: palette.surfaceMuted,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.line,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: palette.text,
    fontSize: 15
  },
  textarea: {
    minHeight: 96,
    textAlignVertical: "top"
  },
  chipScrollContent: {
    paddingRight: 8,
    gap: 10
  },
  choiceChip: {
    borderRadius: 999,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.line,
    paddingHorizontal: 14,
    paddingVertical: 11
  },
  choiceChipActive: {
    backgroundColor: palette.yellow,
    borderColor: palette.yellow
  },
  choiceChipText: {
    color: palette.text,
    fontSize: 13,
    fontWeight: "700"
  },
  choiceChipTextActive: {
    color: palette.blueDeep
  },
  resultBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  resultText: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: "600"
  },
  linkText: {
    color: palette.blue,
    fontSize: 14,
    fontWeight: "700"
  },
  offerCard: {
    backgroundColor: palette.surface,
    borderRadius: 26,
    padding: 14,
    borderWidth: 1,
    borderColor: palette.line,
    gap: 14
  },
  offerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  offerContentRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start"
  },
  offerBadge: {
    backgroundColor: palette.blueSoft,
    color: palette.blueDeep,
    borderRadius: 999,
    overflow: "hidden",
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontSize: 12,
    fontWeight: "700"
  },
  discountChip: {
    backgroundColor: palette.amberSoft,
    color: "#8A6400",
    borderRadius: 999,
    overflow: "hidden",
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontSize: 12,
    fontWeight: "700"
  },
  offerVisual: {
    width: 108,
    height: 154,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  offerImage: {
    width: "100%",
    height: "100%"
  },
  offerVisualText: {
    fontSize: 22,
    fontWeight: "800"
  },
  offerTextColumn: {
    flex: 1,
    gap: 8
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap"
  },
  priceText: {
    color: palette.text,
    fontSize: 24,
    fontWeight: "800"
  },
  oldPriceText: {
    color: palette.muted,
    fontSize: 15,
    textDecorationLine: "line-through"
  },
  priceMini: {
    color: palette.text,
    fontSize: 18,
    fontWeight: "800"
  },
  offerTitle: {
    color: palette.text,
    fontSize: 17,
    fontWeight: "800"
  },
  offerCopy: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 18
  },
  offerMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  metaText: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: "600"
  },
  emptyCard: {
    backgroundColor: palette.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: palette.line,
    padding: 28,
    alignItems: "center",
    gap: 10
  },
  emptyEmoji: {
    width: 86,
    height: 86,
    borderRadius: 24,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 32,
    fontWeight: "800",
    color: palette.blueDeep,
    backgroundColor: palette.amberSoft,
    overflow: "hidden"
  },
  emptyTitle: {
    color: palette.text,
    fontSize: 20,
    fontWeight: "800"
  },
  emptyCopy: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center"
  },
  infoCard: {
    backgroundColor: palette.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.line,
    padding: 16,
    gap: 10
  },
  sectionTitle: {
    color: palette.text,
    fontSize: 18,
    fontWeight: "800"
  },
  sectionCopy: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 20
  },
  storeCard: {
    backgroundColor: palette.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.line,
    padding: 16,
    gap: 10
  },
  storeCardSelected: {
    borderColor: palette.yellow,
    borderWidth: 2
  },
  storeDistance: {
    alignSelf: "flex-start",
    backgroundColor: palette.amberSoft,
    color: "#8A6400",
    borderRadius: 999,
    overflow: "hidden",
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontSize: 12,
    fontWeight: "700"
  },
  storeTitle: {
    color: palette.text,
    fontSize: 18,
    fontWeight: "800"
  },
  storeCopy: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 20
  },
  storeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap"
  },
  formCard: {
    backgroundColor: palette.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: palette.line,
    padding: 16
  },
  wrapRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  twoColumnRow: {
    flexDirection: "row",
    gap: 12
  },
  flexField: {
    flex: 1
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: palette.line
  },
  switchLabel: {
    color: palette.text,
    fontSize: 15,
    fontWeight: "700"
  },
  adminCard: {
    backgroundColor: palette.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.line,
    padding: 16,
    gap: 12
  },
  bottomNav: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: palette.surface,
    borderRadius: 999,
    padding: 8,
    borderWidth: 1,
    borderColor: palette.line,
    marginTop: 8,
    marginBottom: Platform.OS === "android" ? 2 : 0
  },
  navButton: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center"
  },
  navButtonActive: {
    backgroundColor: palette.yellow
  },
  navButtonText: {
    color: palette.text,
    fontSize: 14,
    fontWeight: "700"
  },
  navButtonTextActive: {
    color: palette.blueDeep
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(11, 23, 47, 0.34)",
    justifyContent: "flex-end"
  },
  modalCard: {
    backgroundColor: palette.surface,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 18,
    gap: 14
  },
  modalHandle: {
    width: 58,
    height: 6,
    borderRadius: 999,
    alignSelf: "center",
    backgroundColor: "#CDD8EA"
  },
  modalTitle: {
    color: palette.text,
    fontSize: 24,
    fontWeight: "800"
  },
  toast: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 88,
    backgroundColor: "#101B30",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: "center"
  },
  toastText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700"
  }
});
