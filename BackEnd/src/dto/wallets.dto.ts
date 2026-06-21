export interface WalletDto {
  id: string;
  name: string;
  currency: string;
  createdAt: string;
}

export interface CreateWalletBody {
  name: string;
  currency: string;
}
