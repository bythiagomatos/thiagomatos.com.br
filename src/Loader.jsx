import { useEffect, useState } from "react";

export default function Loader({ onDone, imageUrl = `${import.meta.env.BASE_URL}THIAGO-MATOS.jpeg`}) { 
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState("intro"); // intro -> out -> done

  // trava o scroll enquanto o loader está visível (restaura valor anterior ao sair)
  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevOverflow;
    };
  }, []);

  // contador 0 → 100
  useEffect(() => {
    const id = setInterval(() => setPct((p) => Math.min(p + 1, 100)), 15);
    return () => clearInterval(id);
  }, []);

  // quando atinge 100, troca para a fase de saída (rodam as animações CSS)
useEffect(() => {
  if (pct === 100 && phase === "intro") {
    const hold = setTimeout(() => setPhase("out"), 500);
    return () => clearTimeout(hold);
  }
}, [pct, phase]);

  // quando entra na fase "out", avisa o App depois do tempo da animação
  // inclui um fallback absoluto para nunca ficar travado (StrictMode, etc.)
  useEffect(() => {
    if (phase !== "out") return;

    const doneTimer = setTimeout(() => {
      setPhase("done");
      onDone?.();
    }, 1200); // tempo da minha animação de saída

    const bailout = setTimeout(() => {
      setPhase("done");
      onDone?.();
    }, 5000); // fallback de segurança

    return () => {
      clearTimeout(doneTimer);
      clearTimeout(bailout);
    };
  }, [phase, onDone]);

  // se terminou, desmonta o overlay
  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-900">
      <div id="loader" className="flex flex-col gap-2">
        {/* linha com nome + sol + sobrenome + porcentagem */}
        <div id="loaderTXT" className="flex gap-1 items-center justify-between w-full">
          <div id="loaderTitle" className="text-[13px] flex gap-1">
            <p id="name" className={`textIntro ${phase === "out" ? "textOutro delay-400" : ""}`}>
              THIAGO
            </p>
            <div
              id="symbolSunContainer"
              className={`textIntro ${phase === "out" ? "textOutro delay-500" : ""}`}
            >
              <span id="symbolSun" className="rotateSun inline-block">✳</span>
            </div>
            <p
              id="lastName"
              className={`textIntro delay-200 ${phase === "out" ? "textOutro delay-600" : ""}`}
            >
              MATOS
            </p>
          </div>

          <div id="loaderPercentage" className="flex justify-end w-full">
            <p
              id="porcentagem"
              className={`text-[13px] textIntro delay-200 ${
                phase === "out" ? "textOutro delay-800" : ""
              }`}
            >
              {pct}%
            </p>
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
