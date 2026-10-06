import s from './TrialSteps.module.css';

const STEPS = [
  { time: '0–10 daqiqa', title: 'Tanishuv va baholash', text: "Ustoz bolaning shaxmat bilimi va fikrlash tezligini o'yin tarzidagi savollar orqali aniqlaydi." },
  { time: '10–25 daqiqa', title: "O'yin sessiyasi", text: "Bola ustoz bilan jonli partiya o'ynaydi — qiziqishi va kuchli tomonlari ochiladi." },
  { time: '25–30 daqiqa', title: "Shaxsiy yo'riqnoma", text: "Ota-onaga aniq tavsiyalar: bolaning darajasi, o'sish rejasi va mos guruh." },
];

export function TrialSteps() {
  return (
    <section id="sinov" className="section">
      <div className="container">
        <div className="head-center reveal">
          <span className="eyebrow">30 daqiqada nima bo&apos;ladi?</span>
          <h2 className="h2">
            Bepul sinov darsi — <span className="grad-text">3 bosqich</span>
          </h2>
          <p className="lead">Hech qanday majburiyatsiz. Farzandingizning darajasini aniqlaymiz va aniq yo&apos;l xaritasini beramiz.</p>
        </div>
        <ol className={s.steps}>
          {STEPS.map((st, i) => (
            <li key={st.title} className={`${s.step} reveal`} style={{ ['--d' as string]: `${i * 140}ms` }}>
              <span className={`${s.num} ${i === 2 ? s.last : ''}`}>{i + 1}</span>
              <span className={s.time}>{st.time}</span>
              <h3>{st.title}</h3>
              <p>{st.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
