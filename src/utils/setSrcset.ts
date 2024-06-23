const setSrcsetWrapper = async () => {
  const isAvifSupported = await new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(true));
    image.addEventListener('error', () => resolve(false));
    image.src = 'data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAASttZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAANGlsb2MAAAAAREAAAgABAAAAAAFPAAEAAAAAAAAAFwACAAAAAAFmAAEAAAAAAAABAAAAADhpaW5mAAAAAAACAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAFWluZmUCAAABAAIAAEV4aWYAAAAAamlwcnAAAABLaXBjbwAAABNjb2xybmNseAACAAIABoAAAAAMYXYxQ4EADAAAAAAUaXNwZQAAAAAAAAABAAAAAQAAABBwaXhpAAAAAAMICAgAAAAXaXBtYQAAAAAAAAABAAEEgYIDhAAAABppcmVmAAAAAAAAAA5jZHNjAAIAAQABAAABH21kYXQSAAoFGAAGBCAyDBgACiiihAAAsBNL2AAAAAZFeGlmAABNTQAqAAAACAAGARIAAwAAAAEAAQAAARoABQAAAAEAAABWARsABQAAAAEAAABeASgAAwAAAAEAAgAAATEAAgAAABUAAABmh2kABAAAAAEAAAB8AAAAAAAAAEgAAAABAAAASAAAAAFQaXhlbG1hdG9yIFBybyAzLjYuNAAAAAiQAAAHAAAABDAyMjGQBAACAAAAFAAAAOKRAQAHAAAABAECAwCgAAAHAAAABDAxMDCgAQADAAAAAQABAACgAgAEAAAAAQAAAAGgAwAEAAAAAQAAAAGkBgADAAAAAQAAAAAAAAAAMjAyNDowNjoyMyAwMDoxNTo0MwA=';
  }).catch(() => false);
  if (!isAvifSupported) console.info('%c .AVIF files are not supported. Falling back to .JPG ', 'color:black;background:orange;');
  const format = (isAvifSupported) ? 'avif' : 'jpg';

  return (src: string, srcSet: Array<number>) => srcSet
    .reduce((previous, current, index, sources) => {
      const newSource = `${previous}${src}&auto=format&fm=${format}&q=50&w=${current}&crop=entropy&fit=clip ${current}w`;
      if (index === sources.length - 1) {
        return newSource;
      }
      return `${newSource}, `;
    }, '');
};

export const setSrcset = await setSrcsetWrapper();
