export function findAdjacentTopLevelForms(text: string, cursorPos: number) {
  // Following regex is matching all lines that does not start with whitespace or |> symbol
  let startRegex = /^((?!\|>)\S)/gm;
  var match;
  let matches = [];
  while ((match = startRegex.exec(text)) != null) {
    matches.push(match.index);
  }
  let endIdx = matches.findIndex(idx => idx > cursorPos);
  if (endIdx > 2) {
    let previous = matches[endIdx - 2];
    let current = matches[endIdx - 1];
    let next = matches[endIdx];
    return { previous, current, next };
  } else if (endIdx >= 0) {
    let previous = 0;
    let current = 0;
    let next = matches[endIdx];
    return { previous, current, next };
  } else if (matches.length >= 2) {
    let previous = matches[matches.length - 2];
    let current = matches[matches.length - 1];
    let next = text.length - 1;
    return { previous, current, next };
  } else if (matches.length === 1) {
    let previous = matches[0];
    let current = matches[0];
    let next = text.length - 1;
    return { previous, current, next };
  } else {
    return null;
  }
}
