import eyeLogoImage from 'figma:asset/e847cdb8e51fa81f781549835ef9f5ccdca70952.png';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      {/* Neon Eye Icon */}
      <img src={eyeLogoImage} alt="Eye" className="w-10 h-10 object-contain" />
      
      {/* App Name with Neon Gradient */}
      <span className="bg-gradient-to-r from-pink-500 via-cyan-400 to-pink-500 bg-clip-text text-transparent font-bold">
        CATCH ME
      </span>
    </div>
  );
}
