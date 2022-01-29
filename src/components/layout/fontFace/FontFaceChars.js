import { useDispatch, useSelector } from 'react-redux';
import { set as setCharCoverageModalContent } from '../../../stores/charCoverageModalContentSlice';
import toggleBodyOverflow from '../../../js/toggleBodyOverflow';

export default function FontFaceChars({
  chars, cssText, title
}) {
  const dispatch = useDispatch();
  const lastRequest = useSelector(state => state.lastRequest);

  function openModal() {
    dispatch(setCharCoverageModalContent({ chars, cssText, title }));
    toggleBodyOverflow();
  }

  return (
    <td title={`Included ${chars.included.length}, requested ${lastRequest.chars.length}.\n\nClick to preview.`}>
      <button
        className='char-coverage__modal-open-button'
        onClick={openModal}
      >
        {chars.included.length === lastRequest.chars.length ?
          'ALL' : `${chars.included.length} / ${lastRequest.chars.length}`}
      </button>
    </td>
  );
}
