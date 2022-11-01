export type TLeaderProps = {
  username: string;
  points: number;
  position?: number;
};

export type TLeaderData = {
  data: TLeaderProps;
};

export type TLeaders = Array<TLeaderData>;
