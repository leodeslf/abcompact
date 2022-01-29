import { useSelector } from "react-redux";
import Input from "./components/layout/Input";
import CharCoverageModal from "./components/layout/CharCoverageModal";
import Output from "./components/layout/Output";


function ABChoose() {
  const { charCoverageModalContent } = useSelector(state => state);

  return (
    <>
      <header>
        <h1>
          <a href="/">
            ABChoose
          </a>
        </h1>
      </header>
      <main>
        <Input />
        <Output />
      </main>
      <footer>
        <p>
          © 2021 ABChoose - Save on Google Fonts requests and get only what you need.
        </p>
      </footer>
      {charCoverageModalContent && <CharCoverageModal />}
    </>
  );
}

export default ABChoose;
