import React from 'react';
import { Text } from '@react-three/drei';

interface FallbackText3DProps {
  position?: [number, number, number];
  fontSize?: number;
  color?: string;
  anchorX?: 'center' | 'left' | 'right';
  anchorY?: 'middle' | 'top' | 'bottom';
  children: string;
  maxWidth?: number;
  textAlign?: 'center' | 'left' | 'right';
  letterSpacing?: number;
}

export const FallbackText3D: React.FC<FallbackText3DProps> = ({
  position = [0, 0, 0],
  fontSize = 1,
  color = 'white',
  anchorX = 'center',
  anchorY = 'middle',
  children,
  maxWidth = 10,
  textAlign = 'center',
  letterSpacing = 0.02
}) => {
  return (
    <Text
      position={position}
      fontSize={fontSize}
      color={color}
      anchorX={anchorX}
      anchorY={anchorY}
      maxWidth={maxWidth}
      textAlign={textAlign}
      whiteSpace="nowrap"
      overflowWrap="break-word"
      letterSpacing={letterSpacing}
      // Fallback to system font if custom font fails to load
      font="https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2"
      material-toneMapped={false}
    >
      {children}
    </Text>
  );
};
