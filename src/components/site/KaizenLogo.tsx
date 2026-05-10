interface KaizenLogoProps {
  className?: string;
  size?: number;
}

export function KaizenLogo({ className = "", size = 36 }: KaizenLogoProps) {
  return (
    <img 
      src="/logo.svg" 
      alt="KaizenSpark Logo" 
      width={size} 
      height={size}
      className={className}
      style={{ display: 'block' }}
    />
  );
}
