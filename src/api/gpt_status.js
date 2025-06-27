export async function fetchLocalGPTStatus() {
  try {
    const res = await fetch("http://localhost:1234/v1/models");
    if (!res.ok) throw new Error("GPT not responding");
    const data = await res.json();

    const gptModel = data.data.find(model => 
      model.id.includes("mistral") || model.id.includes("chatml")
    );

    return {
      online: true,
      model: gptModel?.id || "Unknown"
    };
  } catch (err) {
    return {
      online: false,
      model: "Unavailable"
    };
  }
}
