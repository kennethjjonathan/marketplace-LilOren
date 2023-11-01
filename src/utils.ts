export class Utils{
    static convertPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(price).slice(0,-3);
      };
}