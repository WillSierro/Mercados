import React, { useEffect, useState } from "react";
import {
  Image,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TextInput,
  View
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import {
  categories,
  colorOptions,
  createFutureDate,
  createOfferId,
  seedOffers,
  sortOptions,
  stores
} from "./src/data/catalog";
import { cardColors, palette } from "./src/theme";
import { styles } from "./src/styles";
import {
  calculateDiscount,
  formatCurrency,
  formatShortDate,
  getInitials,
  getVisibleOffers,
  isLiveOffer,
  parseDateInput
} from "./src/utils/offers";

function getDefaultForm(storeId) {
  return {
    id: "",
    title: "",
    description: "",
    category: categories[1],
    storeId,
    price: "",
    oldPrice: "",
    unit: "unidade",
    validUntil: createFutureDate(1),
    badge: "Oferta do Dia",
    color: "amber",
    delivery: true,
    pickup: true,
    featured: true,
    club: false,
    active: true
  };
}

function getStoreById(storeId) {
  return stores.find((store) => store.id === storeId) || stores[0];
}

function getOfferStoreLabel(offer) {
  if (offer.allStores) {
    return "Rede Sakashita";
  }

  return getStoreById(offer.storeId).neighborhood;
}

export default function App() {
  const [offers, setOffers] = useState(seedOffers);
  const [currentScreen, setCurrentScreen] = useState("offers");
  const [selectedStoreId, setSelectedStoreId] = useState(stores[0].id);
  const [currentMode, setCurrentMode] = useState("delivery");
  const [feed, setFeed] = useState("daily");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [sortBy, setSortBy] = useState("relevance");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterDraft, setFilterDraft] = useState({
    sortBy: "relevance",
    category: "Todas",
    featuredOnly: false
  });
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(getDefaultForm(stores[0].id));
  const [toast, setToast] = useState("");

  const selectedStore = getStoreById(selectedStoreId);
  const activeOffersCount = offers.filter((offer) => isLiveOffer(offer)).length;
  const visibleOffers = getVisibleOffers({
    offers,
    selectedStoreId,
    currentMode,
    feed,
    category,
    search,
    sortBy,
    featuredOnly
  });

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setToast("");
    }, 2200);

    return () => clearTimeout(timer);
  }, [toast]);

  function updateForm(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function openFilters() {
    setFilterDraft({
      sortBy,
      category,
      featuredOnly
    });
    setFilterVisible(true);
  }

  function applyFilters() {
    setSortBy(filterDraft.sortBy);
    setCategory(filterDraft.category);
    setFeaturedOnly(filterDraft.featuredOnly);
    setFilterVisible(false);
  }

  function clearFilters() {
    setSearch("");
    setCategory("Todas");
    setSortBy("relevance");
    setFeaturedOnly(false);
    setFilterDraft({
      sortBy: "relevance",
      category: "Todas",
      featuredOnly: false
    });
  }

  function resetForm(storeId = selectedStoreId) {
    setEditingId(null);
    setForm(getDefaultForm(storeId));
  }

  function editOffer(offerId) {
    const offer = offers.find((item) => item.id === offerId);
    if (!offer) {
      return;
    }

    setEditingId(offer.id);
    setCurrentScreen("admin");
    setForm({
      id: offer.id,
      title: offer.title,
      description: offer.description,
      category: offer.category,
      storeId: offer.storeId,
      price: String(offer.price),
      oldPrice: String(offer.oldPrice),
      unit: offer.unit,
      validUntil: offer.validUntil,
      badge: offer.badge,
      color: offer.color,
      delivery: offer.modes.includes("delivery"),
      pickup: offer.modes.includes("pickup"),
      featured: Boolean(offer.featured),
      club: Boolean(offer.club),
      active: Boolean(offer.active)
    });
    setToast("Oferta carregada para edicao.");
  }

  function toggleOffer(offerId) {
    setOffers((current) =>
      current.map((offer) =>
        offer.id === offerId ? { ...offer, active: !offer.active } : offer
      )
    );
    setToast("Status da oferta atualizado.");
  }

  function deleteOffer(offerId) {
    setOffers((current) => current.filter((offer) => offer.id !== offerId));

    if (editingId === offerId) {
      resetForm();
    }

    setToast("Oferta excluida.");
  }

  function handleSubmit() {
    const parsedDate = parseDateInput(form.validUntil);
    const modes = [
      form.delivery ? "delivery" : null,
      form.pickup ? "pickup" : null
    ].filter(Boolean);
    const existingOffer = editingId
      ? offers.find((offer) => offer.id === editingId) || null
      : null;

    if (!form.title.trim() || !form.description.trim()) {
      setToast("Preencha produto e descricao.");
      return;
    }

    if (!parsedDate) {
      setToast("Use a validade em YYYY-MM-DD ou DD/MM/YYYY.");
      return;
    }

    if (!modes.length) {
      setToast("Selecione entrega, retirada ou os dois.");
      return;
    }

    const price = Number(form.price);
    const oldPrice = Number(form.oldPrice);

    if (!price || !oldPrice) {
      setToast("Preencha os precos da oferta.");
      return;
    }

    if (oldPrice < price) {
      setToast("O preco anterior deve ser maior ou igual ao preco atual.");
      return;
    }

    const payload = {
      id: form.id || createOfferId(),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      storeId: form.storeId,
      price,
      oldPrice,
      unit: form.unit.trim() || "unidade",
      validUntil: parsedDate,
      badge: form.badge.trim() || "Oferta do Dia",
      color: form.color,
      featured: form.featured,
      club: form.club,
      active: form.active,
      image: existingOffer?.image || null,
      allStores: existingOffer?.allStores || false,
      modes,
      createdAt: editingId
        ? existingOffer?.createdAt || Date.now()
        : Date.now()
    };

    if (editingId) {
      setOffers((current) =>
        current.map((offer) => (offer.id === editingId ? payload : offer))
      );
      setToast("Oferta atualizada.");
    } else {
      setOffers((current) => [payload, ...current]);
      setToast("Oferta criada.");
    }

    setSelectedStoreId(payload.storeId);
    resetForm(payload.storeId);
  }

  function renderCurrentScreen() {
    if (currentScreen === "stores") {
      return (
        <StoresScreen
          currentMode={currentMode}
          onModeChange={setCurrentMode}
          selectedStoreId={selectedStoreId}
          onSelectStore={(storeId) => {
            setSelectedStoreId(storeId);
            setCurrentScreen("offers");
            setToast("Loja selecionada.");
          }}
        />
      );
    }

    if (currentScreen === "admin") {
      return (
        <AdminScreen
          form={form}
          editingId={editingId}
          offers={offers}
          onUpdateForm={updateForm}
          onSubmit={handleSubmit}
          onResetForm={() => resetForm()}
          onEditOffer={editOffer}
          onToggleOffer={toggleOffer}
          onDeleteOffer={deleteOffer}
        />
      );
    }

    return (
      <OffersScreen
        selectedStore={selectedStore}
        activeOffersCount={activeOffersCount}
        feed={feed}
        onFeedChange={setFeed}
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        offers={visibleOffers}
        onOpenFilters={openFilters}
        onOpenAdmin={() => setCurrentScreen("admin")}
        onOpenStores={() => setCurrentScreen("stores")}
        onClearFilters={clearFilters}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="dark" />
      <StatusBar barStyle="dark-content" backgroundColor={palette.background} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.appShell}>
          {renderCurrentScreen()}
          <BottomNav currentScreen={currentScreen} onChange={setCurrentScreen} />
        </View>

        <FilterSheet
          visible={filterVisible}
          draft={filterDraft}
          onDraftChange={setFilterDraft}
          onApply={applyFilters}
          onClose={() => setFilterVisible(false)}
          onReset={() =>
            setFilterDraft({
              sortBy: "relevance",
              category: "Todas",
              featuredOnly: false
            })
          }
        />

        {toast ? (
          <View style={styles.toast}>
            <Text style={styles.toastText}>{toast}</Text>
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function OffersScreen({
  selectedStore,
  activeOffersCount,
  feed,
  onFeedChange,
  currentMode,
  onModeChange,
  search,
  onSearchChange,
  category,
  onCategoryChange,
  offers,
  onOpenFilters,
  onOpenAdmin,
  onOpenStores,
  onClearFilters
}) {
  return (
    <FlatList
      data={offers}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <OfferCard offer={item} />}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.screenContent}
      initialNumToRender={8}
      maxToRenderPerBatch={6}
      windowSize={5}
      removeClippedSubviews={Platform.OS === "android"}
      ListHeaderComponent={
        <>
          <View style={styles.headerCard}>
            <View style={styles.brandRow}>
              <View style={styles.brandBag}>
                <View style={styles.brandBagMarkLeft} />
                <View style={styles.brandBagMarkRight} />
              </View>

              <View style={styles.headerTextColumn}>
                <Text style={styles.eyebrow}>Sakashita Ofertas</Text>
                <Text style={styles.headerTitle}>Cliente</Text>
                <Text style={styles.headerCopy}>
                  {selectedStore.name} | {selectedStore.neighborhood}
                </Text>
              </View>
            </View>

            <Pressable style={styles.ghostButton} onPress={onOpenStores}>
              <Text style={styles.ghostButtonText}>Trocar loja</Text>
            </Pressable>
          </View>

          <View style={styles.heroCard}>
            <Text style={styles.heroPill}>
              {currentMode === "delivery" ? "Entrega ativa" : "Retirada ativa"}
            </Text>
            <Text style={styles.heroTitle}>Ofertas do dia em um app feito para celular.</Text>
            <Text style={styles.heroCopy}>
              O cliente navega pelas promocoes e o mercado atualiza tudo no painel.
            </Text>

            <View style={styles.metricRow}>
              <MetricChip label="Ofertas ativas" value={String(activeOffersCount)} />
              <MetricChip label="Lojas" value={String(stores.length)} />
            </View>

            <View style={styles.buttonRow}>
              <Pressable style={styles.primaryButton} onPress={onOpenFilters}>
                <Text style={styles.primaryButtonText}>Filtros</Text>
              </Pressable>
              <Pressable style={styles.secondaryButton} onPress={onOpenAdmin}>
                <Text style={styles.secondaryButtonText}>Painel</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.segmentCard}>
            <SegmentButton
              label="Ofertas do Dia"
              active={feed === "daily"}
              onPress={() => onFeedChange("daily")}
            />
            <SegmentButton
              label="Clube Sakashita"
              active={feed === "club"}
              onPress={() => onFeedChange("club")}
            />
          </View>

          <View style={styles.searchCard}>
            <Text style={styles.fieldLabel}>Buscar produto</Text>
            <TextInput
              value={search}
              onChangeText={onSearchChange}
              placeholder="Ex.: arroz, tomate, refrigerante..."
              placeholderTextColor={palette.muted}
              style={styles.input}
            />
          </View>

          <ModeSwitch currentMode={currentMode} onChange={onModeChange} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipScrollContent}
          >
            {categories.map((item) => (
              <ChoiceChip
                key={item}
                label={item}
                active={category === item}
                onPress={() => onCategoryChange(item)}
              />
            ))}
          </ScrollView>

          <View style={styles.resultBar}>
            <Text style={styles.resultText}>
              {offers.length} oferta{offers.length === 1 ? "" : "s"} encontrada
              {offers.length === 1 ? "" : "s"}
            </Text>
            <Pressable onPress={onClearFilters}>
              <Text style={styles.linkText}>Limpar</Text>
            </Pressable>
          </View>
        </>
      }
      ListEmptyComponent={
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>S</Text>
          <Text style={styles.emptyTitle}>Nenhuma oferta encontrada.</Text>
          <Text style={styles.emptyCopy}>
            Limpe os filtros ou cadastre novos produtos no painel do mercado.
          </Text>
        </View>
      }
    />
  );
}

function StoresScreen({ currentMode, onModeChange, selectedStoreId, onSelectStore }) {
  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      <View style={styles.headerCard}>
        <View style={styles.headerTextColumn}>
          <Text style={styles.eyebrow}>Selecionar unidade</Text>
          <Text style={styles.headerTitle}>Lojas</Text>
          <Text style={styles.headerCopy}>
            Escolha a unidade que atende melhor o cliente.
          </Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Modo de atendimento</Text>
        <Text style={styles.sectionCopy}>
          O app filtra as ofertas conforme entrega ou retirada.
        </Text>
        <ModeSwitch currentMode={currentMode} onChange={onModeChange} />
      </View>

      {stores.map((store) => (
        <StoreCard
          key={store.id}
          store={store}
          selected={store.id === selectedStoreId}
          onPress={() => onSelectStore(store.id)}
        />
      ))}
    </ScrollView>
  );
}

function AdminScreen({
  form,
  editingId,
  offers,
  onUpdateForm,
  onSubmit,
  onResetForm,
  onEditOffer,
  onToggleOffer,
  onDeleteOffer
}) {
  const orderedOffers = [...offers].sort((left, right) => right.createdAt - left.createdAt);

  return (
    <ScrollView
      contentContainerStyle={styles.screenContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.headerCard}>
        <View style={styles.headerTextColumn}>
          <Text style={styles.eyebrow}>Painel do mercado</Text>
          <Text style={styles.headerTitle}>Admin</Text>
          <Text style={styles.headerCopy}>
            {editingId ? "Editando oferta" : "Cadastrando uma nova oferta"}
          </Text>
        </View>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>Cadastro de oferta</Text>

        <Field label="Produto">
          <TextInput
            value={form.title}
            onChangeText={(value) => onUpdateForm("title", value)}
            placeholder="Ex.: Arroz Tipo 1 5kg"
            placeholderTextColor={palette.muted}
            style={styles.input}
          />
        </Field>

        <Field label="Descricao">
          <TextInput
            value={form.description}
            onChangeText={(value) => onUpdateForm("description", value)}
            placeholder="Resumo rapido da promocao"
            placeholderTextColor={palette.muted}
            multiline
            style={[styles.input, styles.textarea]}
          />
        </Field>

        <Field label="Categoria">
          <View style={styles.wrapRow}>
            {categories
              .filter((item) => item !== "Todas")
              .map((item) => (
                <ChoiceChip
                  key={item}
                  label={item}
                  active={form.category === item}
                  onPress={() => onUpdateForm("category", item)}
                />
              ))}
          </View>
        </Field>

        <Field label="Loja">
          <View style={styles.wrapRow}>
            {stores.map((store) => (
              <ChoiceChip
                key={store.id}
                label={store.neighborhood}
                active={form.storeId === store.id}
                onPress={() => onUpdateForm("storeId", store.id)}
              />
            ))}
          </View>
        </Field>

        <View style={styles.twoColumnRow}>
          <Field label="Preco atual" style={styles.flexField}>
            <TextInput
              value={form.price}
              onChangeText={(value) => onUpdateForm("price", value)}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor={palette.muted}
              style={styles.input}
            />
          </Field>

          <Field label="Preco anterior" style={styles.flexField}>
            <TextInput
              value={form.oldPrice}
              onChangeText={(value) => onUpdateForm("oldPrice", value)}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor={palette.muted}
              style={styles.input}
            />
          </Field>
        </View>

        <View style={styles.twoColumnRow}>
          <Field label="Unidade" style={styles.flexField}>
            <TextInput
              value={form.unit}
              onChangeText={(value) => onUpdateForm("unit", value)}
              placeholder="unidade, kg, pacote"
              placeholderTextColor={palette.muted}
              style={styles.input}
            />
          </Field>

          <Field label="Validade" style={styles.flexField}>
            <TextInput
              value={form.validUntil}
              onChangeText={(value) => onUpdateForm("validUntil", value)}
              placeholder="2026-04-05"
              placeholderTextColor={palette.muted}
              style={styles.input}
            />
          </Field>
        </View>

        <Field label="Selo">
          <TextInput
            value={form.badge}
            onChangeText={(value) => onUpdateForm("badge", value)}
            placeholder="Oferta do Dia"
            placeholderTextColor={palette.muted}
            style={styles.input}
          />
        </Field>

        <Field label="Cor do card">
          <View style={styles.wrapRow}>
            {colorOptions.map((item) => (
              <ChoiceChip
                key={item.value}
                label={item.label}
                active={form.color === item.value}
                onPress={() => onUpdateForm("color", item.value)}
              />
            ))}
          </View>
        </Field>

        <SwitchRow
          label="Entrega"
          value={form.delivery}
          onValueChange={(value) => onUpdateForm("delivery", value)}
        />
        <SwitchRow
          label="Retirada"
          value={form.pickup}
          onValueChange={(value) => onUpdateForm("pickup", value)}
        />
        <SwitchRow
          label="Destaque"
          value={form.featured}
          onValueChange={(value) => onUpdateForm("featured", value)}
        />
        <SwitchRow
          label="Clube"
          value={form.club}
          onValueChange={(value) => onUpdateForm("club", value)}
        />
        <SwitchRow
          label="Oferta ativa"
          value={form.active}
          onValueChange={(value) => onUpdateForm("active", value)}
        />

        <View style={styles.buttonRow}>
          <Pressable style={styles.primaryButton} onPress={onSubmit}>
            <Text style={styles.primaryButtonText}>Salvar oferta</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={onResetForm}>
            <Text style={styles.secondaryButtonText}>Nova oferta</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Ofertas cadastradas</Text>
        <Text style={styles.sectionCopy}>
          {orderedOffers.length} item{orderedOffers.length === 1 ? "" : "s"} no catalogo
        </Text>
      </View>

      {orderedOffers.map((offer) => (
        <AdminOfferCard
          key={offer.id}
          offer={offer}
          onEdit={() => onEditOffer(offer.id)}
          onToggle={() => onToggleOffer(offer.id)}
          onDelete={() => onDeleteOffer(offer.id)}
        />
      ))}
    </ScrollView>
  );
}

function FilterSheet({ visible, draft, onDraftChange, onApply, onClose, onReset }) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={() => {}}>
          <View style={styles.modalHandle} />
          <Text style={styles.eyebrow}>Filtros</Text>
          <Text style={styles.modalTitle}>Refine as ofertas</Text>

          <Field label="Ordenar por">
            <View style={styles.wrapRow}>
              {sortOptions.map((option) => (
                <ChoiceChip
                  key={option.value}
                  label={option.label}
                  active={draft.sortBy === option.value}
                  onPress={() =>
                    onDraftChange((current) => ({
                      ...current,
                      sortBy: option.value
                    }))
                  }
                />
              ))}
            </View>
          </Field>

          <Field label="Categoria">
            <View style={styles.wrapRow}>
              {categories.map((item) => (
                <ChoiceChip
                  key={item}
                  label={item}
                  active={draft.category === item}
                  onPress={() =>
                    onDraftChange((current) => ({
                      ...current,
                      category: item
                    }))
                  }
                />
              ))}
            </View>
          </Field>

          <SwitchRow
            label="Somente destaques"
            value={draft.featuredOnly}
            onValueChange={(value) =>
              onDraftChange((current) => ({
                ...current,
                featuredOnly: value
              }))
            }
          />

          <View style={styles.buttonRow}>
            <Pressable style={styles.secondaryButton} onPress={onReset}>
              <Text style={styles.secondaryButtonText}>Limpar</Text>
            </Pressable>
            <Pressable style={styles.primaryButton} onPress={onApply}>
              <Text style={styles.primaryButtonText}>Aplicar</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function ModeSwitch({ currentMode, onChange }) {
  return (
    <View style={styles.segmentCard}>
      <SegmentButton
        label="Entrega"
        active={currentMode === "delivery"}
        onPress={() => onChange("delivery")}
      />
      <SegmentButton
        label="Retirada"
        active={currentMode === "pickup"}
        onPress={() => onChange("pickup")}
      />
    </View>
  );
}

function OfferCard({ offer }) {
  const colorTheme = cardColors[offer.color] || cardColors.amber;
  const hasImage = Boolean(offer.image);

  return (
    <View style={styles.offerCard}>
      <View style={styles.offerTopRow}>
        <Text style={styles.offerBadge}>{offer.badge || "Oferta"}</Text>
        <Text style={styles.discountChip}>-{calculateDiscount(offer)}%</Text>
      </View>

      <View style={styles.offerContentRow}>
        <View style={[styles.offerVisual, !hasImage && { backgroundColor: colorTheme.background }]}>
          {hasImage ? (
            <Image source={offer.image} style={styles.offerImage} resizeMode="contain" />
          ) : (
            <Text style={[styles.offerVisualText, { color: colorTheme.text }]}>
              {getInitials(offer.title)}
            </Text>
          )}
        </View>

        <View style={styles.offerTextColumn}>
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>{formatCurrency(offer.price)}</Text>
            <Text style={styles.oldPriceText}>{formatCurrency(offer.oldPrice)}</Text>
          </View>

          <Text style={styles.offerTitle}>{offer.title}</Text>
          <Text style={styles.offerCopy} numberOfLines={3}>
            {offer.description}
          </Text>

          <View style={styles.offerMetaRow}>
            <Text style={styles.metaText}>{getOfferStoreLabel(offer)}</Text>
            <Text style={styles.metaText}>{offer.unit}</Text>
            <Text style={styles.metaText}>ate {formatShortDate(offer.validUntil)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function StoreCard({ store, selected, onPress }) {
  return (
    <View style={[styles.storeCard, selected && styles.storeCardSelected]}>
      <Text style={styles.storeDistance}>{store.distance}</Text>
      <Text style={styles.storeTitle}>{store.name}</Text>
      <Text style={styles.storeCopy}>{store.address}</Text>

      <View style={styles.storeFooter}>
        <Text style={styles.metaText}>{store.neighborhood}</Text>
        <Pressable style={styles.primaryButton} onPress={onPress}>
          <Text style={styles.primaryButtonText}>Selecionar</Text>
        </Pressable>
      </View>
    </View>
  );
}

function AdminOfferCard({ offer, onEdit, onToggle, onDelete }) {
  return (
    <View style={styles.adminCard}>
      <View style={styles.offerTopRow}>
        <Text style={styles.offerBadge}>{offer.active ? "Ativa" : "Inativa"}</Text>
        <Text style={styles.priceMini}>{formatCurrency(offer.price)}</Text>
      </View>

      <Text style={styles.offerTitle}>{offer.title}</Text>
      <Text style={styles.offerCopy}>{offer.description}</Text>

      <View style={styles.offerMetaRow}>
        <Text style={styles.metaText}>{offer.category}</Text>
        <Text style={styles.metaText}>{getOfferStoreLabel(offer)}</Text>
        <Text style={styles.metaText}>ate {formatShortDate(offer.validUntil)}</Text>
      </View>

      <View style={styles.buttonRow}>
        <Pressable style={styles.secondaryButton} onPress={onEdit}>
          <Text style={styles.secondaryButtonText}>Editar</Text>
        </Pressable>
        <Pressable style={styles.ghostButton} onPress={onToggle}>
          <Text style={styles.ghostButtonText}>{offer.active ? "Pausar" : "Ativar"}</Text>
        </Pressable>
        <Pressable style={styles.dangerButton} onPress={onDelete}>
          <Text style={styles.dangerButtonText}>Excluir</Text>
        </Pressable>
      </View>
    </View>
  );
}

function BottomNav({ currentScreen, onChange }) {
  return (
    <View style={styles.bottomNav}>
      <NavButton
        label="Ofertas"
        active={currentScreen === "offers"}
        onPress={() => onChange("offers")}
      />
      <NavButton
        label="Lojas"
        active={currentScreen === "stores"}
        onPress={() => onChange("stores")}
      />
      <NavButton
        label="Painel"
        active={currentScreen === "admin"}
        onPress={() => onChange("admin")}
      />
    </View>
  );
}

function NavButton({ label, active, onPress }) {
  return (
    <Pressable
      style={[styles.navButton, active && styles.navButtonActive]}
      onPress={onPress}
    >
      <Text style={[styles.navButtonText, active && styles.navButtonTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

function SegmentButton({ label, active, onPress }) {
  return (
    <Pressable
      style={[styles.segmentButton, active && styles.segmentButtonActive]}
      onPress={onPress}
    >
      <Text style={[styles.segmentButtonText, active && styles.segmentButtonTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

function ChoiceChip({ label, active, onPress }) {
  return (
    <Pressable
      style={[styles.choiceChip, active && styles.choiceChipActive]}
      onPress={onPress}
    >
      <Text style={[styles.choiceChipText, active && styles.choiceChipTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

function Field({ label, children, style }) {
  return (
    <View style={style}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}

function MetricChip({ label, value }) {
  return (
    <View style={styles.metricChip}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function SwitchRow({ label, value, onValueChange }) {
  return (
    <View style={styles.switchRow}>
      <Text style={styles.switchLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? palette.yellow : "#FFFFFF"}
        trackColor={{ false: "#D3DBE8", true: "#3B72C0" }}
      />
    </View>
  );
}
