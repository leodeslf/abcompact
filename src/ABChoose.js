import { createContext, useState } from 'react';
import Header from './components/Header';
import Input from './components/Input';
import Output from './components/Output';
import Footer from './components/Footer';
import requestFonts from './js/font-face-util/requestFonts';
import returnsDefault from './js/font-face-util/returnsDefault';
import CssIsDefaultError from './components/warns/CssIsDefaultError';
import RequestError from './components/warns/RequestError';
import ModalWindow from './components/ModalWindow';

export const FontsContext = createContext();
export const ModalWindowContext = createContext();

export default function ABChoose() {
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [cssIsDefault, setCssIsDefault] = useState(false);

  // Mimic/sort of a Portal to display a modal window from other components.
  const [modalWindow, setModalWindow] = useState(false);
  const updateModalWindow = content => setModalWindow(content);

  // Actual fonts to output (font-face CSS and any feedback).
  const [fonts, setFonts] = useState(false);
  const updateFonts = (chars, fontUri) => {
    setLoading(true);
    setFonts(false);
    setRequestError(false);
    setCssIsDefault(false);

    requestFonts(fontUri, chars)
      .then(async res => {
        setCssIsDefault(await returnsDefault(chars));
        setFonts(res);
      })
      .catch(() => setRequestError(true))
      .finally(() => setLoading(false));
  }

  return (
      <ModalWindowContext.Provider value={{ modalWindow, updateModalWindow }}>
        <Header />
        {modalWindow && <ModalWindow />}
        <main>
          <FontsContext.Provider value={{ fonts, updateFonts }}>
            <Input {...{ loading }} />
            {cssIsDefault && <CssIsDefaultError />}
            {requestError && <RequestError />}
            <Output />
          </FontsContext.Provider>
        </main>
        <Footer />
      </ModalWindowContext.Provider>
  );
}
