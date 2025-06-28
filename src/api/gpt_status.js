export async function fetchLocalGPTStatus() {
  try {
    const res = await fetch("/v1/models");
    const data = await res.json();

    console.log("📦 GPT Models fetched:", data);

    const model = data.data.find(model =>
      model.id.includes("mistral") || model.id.includes("chatml")
    );

    return {
      online: !!model,
      model: model?.id || "Unavailable"
    };
  } catch (error) {
    console.error("❌ Error fetching GPT status:", error.message);
    return {
      online: false,
      model: "Unavailable"
    };
  }
}
