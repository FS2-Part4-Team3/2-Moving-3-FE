import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DriverDetailChips from '@/components/chips/DriverDetailChips';
import { areaMapping, typeMapping } from '@/constants/labelMappings';

describe('DriverDetailChips', () => {
  it('serviceType이 주어지면 해당 서비스 타입을 렌더링한다', () => {
    const serviceType = ['service1', 'service2'];

    render(<DriverDetailChips serviceType={serviceType} availableAreas={[]} />);

    serviceType.forEach(type => {
      // typeMapping에서 해당 type에 대한 값이 있는지 확인하고 없으면 그대로 표시
      const mappedType = typeMapping[type] || type;
      expect(screen.getByText(mappedType)).toBeInTheDocument();
    });
  });

  it('availableAreas가 주어지면 해당 지역을 렌더링한다', () => {
    const availableAreas = ['area1', 'area2'];

    render(<DriverDetailChips serviceType={[]} availableAreas={availableAreas} />);

    availableAreas.forEach(area => {
      // areaMapping에서 해당 area에 대한 값이 있는지 확인하고 없으면 그대로 표시
      const mappedArea = areaMapping[area] || area;
      expect(screen.getByText(mappedArea)).toBeInTheDocument();
    });
  });

  it('serviceType과 availableAreas가 모두 주어지면 둘 다 렌더링된다', () => {
    const serviceType = ['service1', 'service2'];
    const availableAreas = ['area1', 'area2'];

    render(<DriverDetailChips serviceType={serviceType} availableAreas={availableAreas} />);

    // serviceType에 해당하는 값이 모두 렌더링되는지 확인
    serviceType.forEach(type => {
      const mappedType = typeMapping[type] || type;
      expect(screen.getByText(mappedType)).toBeInTheDocument();
    });

    // availableAreas에 해당하는 값이 모두 렌더링되는지 확인
    availableAreas.forEach(area => {
      const mappedArea = areaMapping[area] || area;
      expect(screen.getByText(mappedArea)).toBeInTheDocument();
    });
  });

  it('serviceType과 availableAreas가 빈 배열이면 아무것도 렌더링되지 않는다', () => {
    render(<DriverDetailChips serviceType={[]} availableAreas={[]} />);

    // 텍스트가 없을 것임을 확인
    expect(screen.queryByText(/service/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/area/i)).not.toBeInTheDocument();
  });
});
