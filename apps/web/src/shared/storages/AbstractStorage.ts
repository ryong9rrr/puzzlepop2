interface Props {
  key: string;
  type: "session" | "local";
}

export abstract class AbstractStorage<T> {
  private key: string;
  private storage: globalThis.Storage;

  constructor(props: Props) {
    const { key, type } = props;

    this.key = key;
    this.storage = type === "session" ? window.sessionStorage : window.localStorage;
  }

  getItem(): T {
    const value = this.storage.getItem(this.key);

    if (!value) {
      throw new Error(`No value found for key: ${this.key}`);
    }

    const parsedValue = JSON.parse(value);
    if (!this.validate(parsedValue)) {
      throw new Error(`Invalid value for key: ${this.key}`);
    }
    return parsedValue as T;
  }

  setItem(value: T) {
    this.storage.setItem(this.key, JSON.stringify(value));
  }

  removeItem() {
    this.storage.removeItem(this.key);
  }

  abstract validate(parsedData: any): boolean;
}
