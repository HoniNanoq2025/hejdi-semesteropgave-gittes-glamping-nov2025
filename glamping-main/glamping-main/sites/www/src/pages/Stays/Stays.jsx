import Hero from "../../components/Hero/Hero";
import OverlappingSection from "../../components/OverlappingSection/OverlappingSection";
import hero from "../../assets/image_01.jpg";

export default function Stays() {
  return (
    <>
      <Hero
        variant="simple"
        backgroundImage={hero}
        title="Vores Ophold"
        minHeight={{ xs: "80vh", md: "100vh" }}
      />
      <OverlappingSection
        header="Vi har ophold til enhver smag"
        body="Vores glampingophold er skabt til at tilbyde en kombination af eventyr og afslapning. Det er den ideelle flugt fra byens støj og stress, og det perfekte sted at genoplade batterierne i en naturskøn indstilling.
      Book dit ophold i dag og giv dig selv lov til at fordybe dig i naturen og nyde luksus i det fri. Vi ser frem tid at byde dig velkommen til en oplevelse fyldt med komfort, eventyr og skønhed."
        isHome={false}
      />
    </>
  );
}
