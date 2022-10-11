export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  photo: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
