import { useEffect, useRef, useState } from "react";

export default function Loader({
  onDone,
  imageUrl = `${import.meta.env.BASE_URL}THIAGO-MATOS.jpeg`,
}) {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState("intro"); // intro -> out -> done
  const timerRef = useRef(null);

  // trava scroll
  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prevOverflow; };
  }, []);

  // contador 0 → 100
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setPct((p) => (p >= 100 ? 100 : p + 1));
    }, 15);
    return () => clearInterval(timerRef.current);
  }, []);

  // ao atingir 100 na fase "intro": pare o timer e troque para "out"
  useEffect(() => {
    if (pct === 100 && phase === "intro") {
      clearInterval(timerRef.current);
      const t = setTimeout(() => setPhase("out"), 30);
      return () => clearTimeout(t);
    }
  }, [pct, phase]);

  // fase "out": aguarde animação e finalize
  useEffect(() => {
    if (phase !== "out") return;

    const doneTimer = setTimeout(() => {
      setPhase("done");
      onDone?.();
    }, 1200); // tempo da animação de saída

    const bailout = setTimeout(() => {
      setPhase("done");
      onDone?.();
    }, 5000); // fallback

    return () => {
      clearTimeout(doneTimer);
      clearTimeout(bailout);
    };
  }, [phase, onDone]);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-900">
      <div id="loader" className="flex flex-col gap-2">
        {/* linha com nome + sol + sobrenome + porcentagem */}
        <div id="loaderTXT" className="flex gap-1 items-center justify-between w-full">
          <div id="loaderTitle" className="text-[13px] flex gap-1">
            {/* THIAGO (container = máscara fixa; texto anima) */}
            <span className="inline-block overflow-hidden leading-[1] h-[1em]">
              <p className={phase === "intro" ? "textIntro" : "textOutro delay-400"}>
                THIAGO
              </p>
            </span>

            {/* ✳ */}
            <span className="inline-block overflow-hidden leading-[1] h-[1em]">
              <div className={phase === "intro" ? "textIntro" : "textOutro delay-500"}>
                <span id="symbolSun" className="rotateSun inline-block">✳</span>
              </div>
            </span>

            {/* MATOS */}
            <span className="inline-block overflow-hidden leading-[1] h-[1em]">
              <p className={phase === "intro" ? "textIntro delay-200" : "textOutro delay-600"}>
                MATOS
              </p>
            </span>
          </div>

          {/* % */}
          <div id="loaderPercentage" className="flex justify-end w-full">
            <span className="inline-block overflow-hidden leading-[1] h-[1em]">
              <p
                id="porcentagem"
                className={`text-[13px] ${
                  phase === "intro" ? "textIntro delay-200" : "textOutro delay-800"
                }`}
              >
                {pct}%
              </p>
            </span>
          </div>
        </div>

        {/* imagem com abre/fecha por clip-path */}
        <div
          className={`loaderImgContainer ${phase === "intro" ? "loaderIn" : "loaderOut"}`}
          style={{ width: 220, height: 275 }}
        >
          <div className="loaderImg" style={{ backgroundImage: `url(${imageUrl})` }} />
        </div>
      </div>
    </div>
  );
}
