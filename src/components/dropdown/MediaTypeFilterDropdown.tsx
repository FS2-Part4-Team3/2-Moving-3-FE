import checkbox from "@/../public/assets/common/check-box/check-box.svg";
import checkbox_blue from "@/../public/assets/common/check-box/check-box_blue.svg";
import Image from "next/image";

export default function MediaTypeFilterDropdown() {
  return (
    <div>
      <div>
        <div>
          <p>이사 유형</p>
          <div>
            <Image src={checkbox} alt="checkbox" width={36} height={36} />
            <p>전체선택</p>
          </div>
        </div>
        <div>
          <div>
            <div>
              <p>소형이사</p>
              <p>(10)</p>
            </div>
            <Image src={checkbox} alt="checkbox" width={36} height={36} />
          </div>
          <div>
            <div>
              <p>가정이사</p>
              <p>(50)</p>
            </div>
            <Image src={checkbox} alt="checkbox" width={36} height={36} />
          </div>
          <div>
            <div>
              <p>사무실이사</p>
              <p>(1999)</p>
            </div>
            <Image src={checkbox} alt="checkbox" width={36} height={36} />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>필터</p>
          <div>
            <Image src={checkbox} alt="checkbox" width={36} height={36} />
            <p>전체선택</p>
          </div>
        </div>
        <div>
          <div>
            <div>
              <p>서비스 가능 지역</p>
              <p>(990)</p>
            </div>
            <Image src={checkbox} alt="checkbox" width={36} height={36} />
          </div>
          <div>
            <div>
              <p>지정 견적 요청</p>
              <p>(50090)</p>
            </div>
            <Image src={checkbox} alt="checkbox" width={36} height={36} />
          </div>
        </div>
      </div>
    </div>
  );
}
