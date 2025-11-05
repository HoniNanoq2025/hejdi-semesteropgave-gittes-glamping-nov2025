import Hero from "../../components/Hero/Hero";
import heroMyList from "../../assets/image_05.jpg";

export default function MyList() {
  return (
    <>
      <Hero
        variant="simple"
        backgroundImage={heroMyList}
        title="Min liste"
        minHeight={{ xs: "80vh", md: "100vh" }}
      />
    </>
  );
}
