// shoutout to: https://github.com/kentonv/dvorak-qwerty/blob/1819148d8497a1989e87349d083f723659d0b9e6/unix/xdq.c#L117
const qwertyLayout = "-=qwertyuiop[]asdfghjkl;'zxcvbnm,./";
const dvorakLayout = "[]',.pyfgcrl/=aoeuidhtns-;qjkxbmwvz";

const createLayoutMap = (layout: string) => {
      const map = qwertyLayout.split("").reduce((acc, key, index) => {
            acc[key] = layout[index];
            return acc;
      }
      , {} as Record<string, string>);
      return map;
};

export const qwertyMap = createLayoutMap(qwertyLayout);
export const dvorakMap = createLayoutMap(dvorakLayout);