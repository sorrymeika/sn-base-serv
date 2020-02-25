const { Dao } = require('sonorpc');

class AddressDao extends Dao {
    addProvince({ provinceName, provinceCode }) {
        return this.connection.insert('province', {
            name: provinceName,
            areaCode: provinceCode
        });
    }

    addCity({ cityName, cityCode, provinceId, provinceCode }) {
        return this.connection.insert('city', {
            name: cityName,
            areaCode: cityCode,
            provinceId,
            provinceCode
        });
    }

    addDistrict({ districtName, districtCode, cityId, cityCode }) {
        return this.connection.insert('district', {
            name: districtName,
            areaCode: districtCode,
            cityId,
            cityCode
        });
    }

    getProvinces() {
        return this.connection.query('select id,name,areaCode from province');
    }

    getCitiesByProvinceId(provinceId) {
        return this.connection.query('select id,name,areaCode,initial from city where provinceId=@p0', [provinceId]);
    }

    getCitiesByProvinceCode(provinceCode) {
        return this.connection.query('select id,name,areaCode,initial from city where provinceCode=@p0', [provinceCode]);
    }

    getDistrictsByCityId(cityId) {
        return this.connection.query('select id,name,areaCode from district where cityId=@p0', [cityId]);
    }

    getDistrictsByCityCode(cityCode) {
        return this.connection.query('select id,name,areaCode from district where cityCode=@p0', [cityCode]);
    }

    getAreaInfosByDistrictCodes(districtCodes) {
        return this.connection.query(`select 
            a.id,a.name as districtName,a.areaCode as districtCode,a.cityCode,
            b.name as cityName,
            c.areaCode as provinceCode,c.name as provinceName
                from district a 
                join city b on a.cityCode=b.areaCode
                join province c on b.provinceCode=c.areaCode
            where a.areaCode in (?)
        `, [districtCodes]);
    }

    getAreaInfoByDistrictCode(districtCode) {
        return this.connection.query(
            `select 
                a.id,a.name as districtName,a.areaCode as districtCode,a.cityCode,
                b.name as cityName,
                c.areaCode as provinceCode,c.name as provinceName
                    from district a 
                    join city b on a.cityCode=b.areaCode
                    join province c on b.provinceCode=c.areaCode
                where a.areaCode=@p0
            `, [districtCode])
            .then(rows => rows[0]);
    }
}

module.exports = AddressDao;