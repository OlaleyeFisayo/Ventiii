export function useCheckPasswardStrength(str: string) {
  const requirements = [
    {
      regex: /.{8,}/,
      text: "At least 8 characters",
    },
    {
      regex: /\d/,
      text: "At least 1 number",
    },
    {
      regex: /[a-z]/,
      text: "At least 1 lowercase letter",
    },
    {
      regex: /[A-Z]/,
      text: "At least 1 uppercase letter",
    },
  ];

  return requirements.map(req => ({
    met: req.regex.test(str),
    text: req.text,
  }));
}
