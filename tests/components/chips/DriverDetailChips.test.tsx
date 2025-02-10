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

describe('DriverDetailChips - 존재하지 않는 값 테스트', () => {
  it('존재하지 않는 serviceType 값을 넣었을 때, 그대로 렌더링된다', () => {
    const invalidServiceTypes = ['UNKNOWN_SERVICE', 'RANDOM_TYPE'];

    render(<DriverDetailChips serviceType={invalidServiceTypes} />);

    invalidServiceTypes.forEach(type => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });

  it('존재하지 않는 availableAreas 값을 넣었을 때, 그대로 렌더링된다', () => {
    const invalidAreas = ['MARS', 'ATLANTIS'];

    render(<DriverDetailChips availableAreas={invalidAreas} />);

    invalidAreas.forEach(area => {
      expect(screen.getByText(area)).toBeInTheDocument();
    });
  });

  it('존재하는 값과 존재하지 않는 값이 섞여 있을 때, 각각 올바르게 처리된다', () => {
    const mixedServiceTypes = ['HOME', 'UNKNOWN_SERVICE'];
    const mixedAreas = ['SEOUL', 'MARS'];

    render(<DriverDetailChips serviceType={mixedServiceTypes} availableAreas={mixedAreas} />);

    expect(screen.getByText(typeMapping['HOME'])).toBeInTheDocument();
    expect(screen.getByText(areaMapping['SEOUL'])).toBeInTheDocument();

    expect(screen.getByText('UNKNOWN_SERVICE')).toBeInTheDocument();
    expect(screen.getByText('MARS')).toBeInTheDocument();
  });
});
