import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Send, Loader2 } from "lucide-react";
import { CONSTANTS } from "../data/constants";

const TIME_SLOTS = [
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30",
];

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function Reservas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const today = formatDate(new Date());

  const [form, setForm] = useState({
    fecha: today,
    hora: "",
    personas: "2",
    nombre: "",
    telefono: "",
    comentarios: "",
  });

  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!form.fecha) return;
    setLoading(true);
    setMessage(null);
    fetch(`/api/reservation/slots?fecha=${form.fecha}`)
      .then((res) => res.json())
      .then((data) => setBookedSlots(data.booked || []))
      .catch(() => setBookedSlots([]))
      .finally(() => setLoading(false));
  }, [form.fecha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.hora) return;

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 409) {
        const data = await res.json();
        setMessage({ type: "error", text: data.message || "Ese horario ya no está disponible. Por favor, elige otro." });
        return;
      }

      if (!res.ok) {
        setMessage({ type: "error", text: "Error al enviar la reserva. Inténtalo de nuevo." });
        return;
      }

      setMessage({ type: "success", text: "Reserva enviada con éxito. Te confirmaremos por teléfono." });
      setForm((prev) => ({ ...prev, hora: "", nombre: "", telefono: "", comentarios: "" }));
    } catch {
      setMessage({ type: "error", text: "Error de conexión. Inténtalo de nuevo." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reservas" className="py-24 md:py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-gold text-xs uppercase tracking-[0.2em]">
              Reservas
            </span>
            <h2 className="font-serif text-4xl md:text-5xl mt-2 mb-6">
              Reserve su mesa
            </h2>
            <p className="text-text-secondary leading-relaxed mb-10">
              Le confirmaremos su reserva por teléfono. Para grupos de más de
              10 personas, por favor contacte directamente con el restaurante.
            </p>

            <div className="border border-border/50 p-8">
              <p className="text-xs uppercase tracking-[0.15em] text-gold mb-3">
                Prefiere llamar?
              </p>
              <a
                href={`tel:${CONSTANTS.phone}`}
                className="inline-flex items-center gap-3 text-text-primary hover:text-gold transition-colors duration-300"
              >
                <Phone size={18} className="text-gold" />
                <span className="font-serif text-xl">{CONSTANTS.phoneDisplay}</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col gap-5">
                <div className="w-full">
                  <label className="block text-xs uppercase tracking-[0.15em] text-text-secondary mb-2">
                    Fecha
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={form.fecha}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, fecha: e.target.value }))
                    }
                    className="w-full bg-bg-card border border-border/50 px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold/60 transition-colors duration-300 appearance-none [-webkit-appearance:none]"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-xs uppercase tracking-[0.15em] text-text-secondary mb-2">
                    Hora
                  </label>
                  <select
                    value={form.hora}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, hora: e.target.value }))
                    }
                    className={`w-full bg-bg-card border border-border/50 px-4 py-3 text-sm focus:outline-none focus:border-gold/60 transition-colors duration-300 ${
                      form.hora ? "text-text-primary" : "text-text-muted"
                    }`}
                    required
                  >
                    <option value="" disabled>
                      {loading ? "Cargando..." : "Seleccionar"}
                    </option>
                    {TIME_SLOTS.map((slot) => (
                      <option
                        key={slot}
                        value={slot}
                        disabled={bookedSlots.includes(slot)}
                        className="bg-bg-card"
                      >
                        {slot}
                        {bookedSlots.includes(slot) ? " — no disponible" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <label className="block text-xs uppercase tracking-[0.15em] text-text-secondary mb-2">
                    Personas
                  </label>
                  <select
                    value={form.personas}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        personas: e.target.value,
                      }))
                    }
                    className="w-full bg-bg-card border border-border/50 px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold/60 transition-colors duration-300"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n} className="bg-bg-card">
                        {n} {n === 1 ? "persona" : "personas"}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <label className="block text-xs uppercase tracking-[0.15em] text-text-secondary mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, nombre: e.target.value }))
                    }
                    className="w-full bg-bg-card border border-border/50 px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold/60 transition-colors duration-300"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-xs uppercase tracking-[0.15em] text-text-secondary mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={form.telefono}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        telefono: e.target.value,
                      }))
                    }
                    className="w-full bg-bg-card border border-border/50 px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold/60 transition-colors duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-text-secondary mb-2">
                  Comentarios <span className="text-text-muted">(opcional)</span>
                </label>
                <textarea
                  value={form.comentarios}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      comentarios: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full min-w-0 bg-bg-card border border-border/50 px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold/60 transition-colors duration-300 resize-none [touch-action:manipulation]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || !form.hora}
                className="w-full bg-gold text-[#1C1C1C] py-3 text-sm uppercase tracking-[0.15em] font-semibold hover:bg-gold-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                {submitting ? "Enviando..." : "Reservar"}
              </button>

              {message && (
                <div
                  className={`p-4 text-sm ${
                    message.type === "success"
                      ? "bg-green-900/30 text-green-300 border border-green-700/30"
                      : "bg-red-900/30 text-red-300 border border-red-700/30"
                  }`}
                >
                  {message.text}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
