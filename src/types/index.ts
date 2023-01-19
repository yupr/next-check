// API ---------------------------------------
export interface User {
  id: number;
  name: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface LabelViewInfo {
  container: {
    size: { width: number; height: number };
  };
  items: {
    nickname: {
      groupId: number;
      position: {
        x: number;
        y: number;
      };
      fontSize: number;
    };
  };
}

// ---------------------------------------------
