export const HTMLTemplate = ({ content, title }: Args) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>${title}</title>
</head>
<body>
  ${content}
</body>
</html>
`;

type Args = {
  content: string;
  title: string;
};
