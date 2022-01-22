export const getShopId = async (params: string) => {
  const html = await fetch(`https://baemin.me/${params}`);

  const url = new URL(html.url);

  return url.searchParams.get('shopDetail_shopNo');
};
