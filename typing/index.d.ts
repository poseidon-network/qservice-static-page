type TUser = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
};

interface ITextBaseProps {
  children: React.ReactNode;
  center?: boolean;
  margin?: string;
  color?: string;
  id?: string;
  style?: string;
  mStyle?: string;
  sStyle?: string;
}

interface ITrans {
  t: i18next.TFunction;
  tReady: boolean;
}
