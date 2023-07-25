const emptyString = '';
const lengthOneCharacters = 'a0!';
const lengthOneEmojis = '❤♻✔';
const nonLengthOneEmojis = '👨‍👧‍👧👩‍❤️‍💋‍👩🏴󠁧󠁢󠁷󠁬󠁳󠁿';
const mixedCharacters = `${lengthOneCharacters
  }${lengthOneEmojis
  }${nonLengthOneEmojis}`;
const mixedCharactersAndEmojisWithVariations = '👩👩🏻‍❤️‍💋‍👩🏻👨🏿‍❤️‍💋‍👨🏿👨‍❤️‍💋‍👨👩🏻b👨🏻‍❤️‍💋‍👨🏻c👩🏿‍❤️‍💋‍👩🏿👩👩‍❤️‍💋‍👨👩🏻bc👩‍❤️‍💋‍👩a👩🏿👨👫👨🏿👨🏿‍🤝‍👨🏿👬2👨🏻‍❤️‍💋‍👨🏻31👨🏻👭👩🏻‍🤝‍👩🏻👨🏻‍🤝‍👨🏻👩🏻‍🤝‍🧑🏻@#👩🏿‍❤️‍💋‍👨🏿$👩🏿‍🤝‍👩🏿👩🏿‍🤝‍🧑🏿a👩🏿👩🏻‍❤️‍💋‍👩🏻👨👫👨🏿👨🏿‍🤝‍👨🏿👩👩🏻bca👩🏿👨👫👨🏿👨🏿‍🤝‍👨🏿👩🏿‍❤️‍💋‍👩🏿👬2👨🏿‍❤️‍💋‍👨🏿31👩‍❤️‍💋‍👩👨🏻👭👩🏻‍🤝‍👩🏻👩‍❤️‍💋‍👨👨🏻‍🤝‍👨🏻👩🏻‍🤝‍🧑🏻@👩🏿‍❤️‍💋‍👨🏿#$👨‍❤️‍💋‍👨👩🏿‍🤝‍👩🏿👩🏻‍❤️‍💋‍👩🏻👩🏿‍🤝‍🧑🏿👬2👩🏻‍❤️‍💋‍👨🏻31👨🏻👭👩🏻‍🤝‍👩🏻👨🏻‍🤝‍👨🏻👩🏻‍🤝‍🧑🏻@#👩👩🏿‍❤️‍💋‍👩🏿👩🏻👨🏿‍❤️‍💋‍👨🏿b👩🏻‍❤️‍💋‍👨🏻ca👩🏿👨👫👨🏿👨🏿‍🤝‍👨🏿👬2👩🏿‍❤️‍💋‍👨🏿31👨‍❤️‍💋‍👨👨🏻👭👩🏻‍🤝‍👩🏻👨🏻‍🤝‍👨🏻👩🏻‍🤝‍🧑🏻👩‍❤️‍💋‍👩@👨🏻‍❤️‍💋‍👨🏻#👩🏻‍❤️‍💋‍👨🏻$👩‍❤️‍💋‍👨👩🏿‍🤝‍👩🏿👩🏿‍🤝‍🧑🏿$👩🏿‍🤝‍👩🏿👩🏿‍🤝‍🧑🏿';

export {
  emptyString,
  mixedCharacters,
  mixedCharactersAndEmojisWithVariations,
  nonLengthOneEmojis,
  lengthOneCharacters,
  lengthOneEmojis
};
