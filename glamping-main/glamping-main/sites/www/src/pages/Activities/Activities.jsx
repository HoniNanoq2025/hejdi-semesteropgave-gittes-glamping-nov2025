import Hero from "../../components/Hero/Hero";
import OverlappingSection from "../../components/OverlappingSection/OverlappingSection";
import hero from "../../assets/image_04.jpg";

export default function Activities() {
  return (
    <>
      <Hero
        variant="simple"
        backgroundImage={hero}
        title="Aktiviteter"
        minHeight={{ xs: "80vh", md: "100vh" }}
      />
      <OverlappingSection
        header="Ingen skal kede sig hos Gitte"
        body="Glamping er mere end blot en indkvartering - det er en mulighed for at fordybe dig i naturen og skabe minder, der varer livet ud. Uanset om du foretrækker en eventyrlig kanotur, en oplysende naturvandring, hjertevarm samvær omkring bålet, smagfulde oplevelser som vinsmagning eller morgenyoga, der giver dig indre ro og balance i naturens skød - vil vi hos Gittes Glamping imødekomme dine ønsker."
        isHome={false}
      />
    </>
  );
}
