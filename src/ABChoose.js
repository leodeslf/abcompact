import { createContext, useState } from 'react';
import Header from './components/Header';
import Input from './components/Input';
import Output from './components/Output';
import Footer from './components/Footer';
import FontFaceIsDefaultError from './components/warns/FontFaceIsDefaultError';
import RequestError from './components/warns/RequestError';
import ModalWindow from './components/ModalWindow';
import getFontFaceSet from './js/util/getFontFaceSet';

export const FontFaceSetContext = createContext();
export const ModalWindowContext = createContext();

export default function ABChoose() {
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [fontFaceIsDefault, setFontFaceIsDefault] = useState(false);

  // Mimic/sort of a Portal to display a modal window from other components.
  const [modalWindow, setModalWindow] = useState(false);
  const updateModalWindow = content => setModalWindow(content);

  // Actual data to output (font-face CSS and any feedback).
  const [fontFaceSet, setFontFaceSet] = useState(false);
  const updateFontFaceSet = (chars, fontURL) => {
    setLoading(true);
    setFontFaceSet(false);
    setRequestError(false);
    setFontFaceIsDefault(false);

    getFontFaceSet(fontURL, chars)
      .then(res => {
        setFontFaceSet(res.fontFaceSet);
        setFontFaceIsDefault(res.isDefault);        
      })
      .catch(() => setRequestError(true))
      .finally(() => setLoading(false));
  }

  return (
    <ModalWindowContext.Provider value={{ modalWindow, updateModalWindow }}>
      <div
        className="scrollable"
        style={{ overflowY: modalWindow ? 'hidden' : 'auto' }}
      >
        <Header />
        {modalWindow && <ModalWindow />}
        <main>
          <FontFaceSetContext.Provider value={{ fontFaceSet, updateFontFaceSet }}>
            <Input {...{ loading }} />
            {fontFaceIsDefault && <FontFaceIsDefaultError />}
            {requestError && <RequestError />}
            <Output />
          </FontFaceSetContext.Provider>
        </main>
        <Footer />
      </div>
    </ModalWindowContext.Provider>
  );
}
