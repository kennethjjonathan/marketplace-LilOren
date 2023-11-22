export class SellerPageServer {
  static get = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (!response.ok) throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
}
