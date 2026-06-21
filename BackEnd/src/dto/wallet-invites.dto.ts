export interface WalletInviteDto {
  id: string;
  walletId: string;
  inviterId: string;
  inviteeEmail: string;
  token: string;
  status: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface WalletMemberLinkDto {
  userId: string;
  walletId: string;
  role: string;
}

export interface CreateInviteBody {
  inviteeEmail: string;
}

export interface WalletMemberDto {
  id: string;
  name: string;
  email: string;
  role: string;
}
