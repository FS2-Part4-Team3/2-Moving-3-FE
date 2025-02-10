import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DriverDetailChips from '@/components/chips/DriverDetailChips';
import { areaMapping, typeMapping } from '@/constants/labelMappings';

describe('DriverDetailChips', () => {
  it('typeMapping의 모든 값이 정상적으로 렌더링되는지 확인', () => {
    const serviceTypes = Object.keys(typeMapping);

    render(<DriverDetailChips serviceType={serviceTypes} />);

    serviceTypes.forEach(type => {
      expect(screen.getByText(typeMapping[type])).toBeInTheDocument();
    });
  });

  it('areaMapping의 모든 값이 정상적으로 렌더링되는지 확인', () => {
    const availableAreas = Object.keys(areaMapping);

    render(<DriverDetailChips availableAreas={availableAreas} />);

    availableAreas.forEach(area => {
      expect(screen.getByText(areaMapping[area])).toBeInTheDocument();
    });
  });

  it('serviceType과 availableAreas가 없으면 아무것도 렌더링되지 않는다', () => {
    render(<DriverDetailChips />);

    expect(screen.queryByText(/service/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/area/i)).not.toBeInTheDocument();
  });
});
