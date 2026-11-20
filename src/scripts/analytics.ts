function gtag(command: "event", name: string, params: Record<string, string>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

function trackClick(el: HTMLElement) {
  const kind = el.dataset.analytics;

  if (kind === "product_click") {
    gtag("event", "product_click", {
      product_name: el.dataset.productName || "",
      product_slug: el.dataset.productSlug || "",
      product_category: el.dataset.productCategory || "",
    });
    return;
  }

  if (kind === "filter_select") {
    gtag("event", "filter_select", {
      filter_context: el.dataset.filterContext || "",
      filter_label: el.dataset.filterLabel || el.textContent?.trim() || "",
      filter_value: el.dataset.filterValue || el.dataset.filter || "",
    });
    return;
  }

  if (kind === "resource_click") {
    gtag("event", "resource_click", {
      resource_title: el.dataset.resourceTitle || "",
      resource_action: el.dataset.resourceAction || "view",
      resource_group: el.dataset.resourceGroup || "",
      resource_type: el.dataset.resourceType || "",
      resource_url: el instanceof HTMLAnchorElement ? el.href : "",
    });
  }
}

function trackContactForm() {
  const form = document.querySelector<HTMLFormElement>('form[name="contact"]');
  if (!form) return;

  const productField = form.querySelector<HTMLInputElement>('input[name="product"]');
  const product = new URLSearchParams(window.location.search).get("product") || "";
  if (productField && product) productField.value = product;

  let started = false;
  form.addEventListener("focusin", () => {
    if (started) return;
    started = true;
    gtag("event", "contact_form_start", {
      form_name: "contact",
      product_name: productField?.value || "",
    });
  });

  form.addEventListener("submit", () => {
    const bot = form.querySelector<HTMLInputElement>('input[name="bot-field"]');
    if (bot?.value) return;
    sessionStorage.setItem(
      "vinylast:pending-contact",
      JSON.stringify({ product_name: productField?.value || "" }),
    );
  });
}

function trackContactSuccess() {
  if (new URLSearchParams(window.location.search).get("submitted") !== "true") return;
  const raw = sessionStorage.getItem("vinylast:pending-contact");
  if (!raw) return;
  sessionStorage.removeItem("vinylast:pending-contact");

  let productName = "";
  try {
    const parsed = JSON.parse(raw) as { product_name?: string };
    productName = parsed.product_name || "";
  } catch {
    productName = "";
  }

  gtag("event", "contact_form_submit", {
    form_name: "contact",
    product_name: productName,
  });
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const el = target.closest<HTMLElement>("[data-analytics]");
  if (!el) return;
  trackClick(el);
});

trackContactForm();
trackContactSuccess();
