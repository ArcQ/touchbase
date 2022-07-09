export type ConnectOptions = {
  prompt?: boolean;
};

export type Connect = (options?: ConnectOptions) => Promise<void>;
