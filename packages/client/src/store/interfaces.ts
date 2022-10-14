export type InitialUserType = {
  id: number | null;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export interface ICommonState {
  currentUser: InitialUserType;
  theme: string;
  isAuthModalOpen: boolean;
  isLoading: boolean;
  language: string;
}
